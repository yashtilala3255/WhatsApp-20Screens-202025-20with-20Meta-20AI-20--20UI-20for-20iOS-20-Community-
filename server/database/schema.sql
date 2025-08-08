-- WhatsApp Clone Database Schema
-- SQLite for development, can be adapted for PostgreSQL/MySQL

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    profile_image_url TEXT,
    about TEXT DEFAULT 'Hey there! I am using WhatsApp.',
    last_seen DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_online BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Chats table (for both individual and group chats)
CREATE TABLE IF NOT EXISTS chats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255), -- NULL for individual chats, group name for groups
    description TEXT, -- For group descriptions
    chat_type ENUM('individual', 'group') DEFAULT 'individual',
    avatar_url TEXT,
    created_by INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Chat participants (many-to-many relationship)
CREATE TABLE IF NOT EXISTS chat_participants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    chat_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    role ENUM('admin', 'member') DEFAULT 'member',
    joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    left_at DATETIME NULL,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(chat_id, user_id)
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    chat_id INTEGER NOT NULL,
    sender_id INTEGER NOT NULL,
    content TEXT,
    message_type ENUM('text', 'image', 'video', 'audio', 'document', 'location') DEFAULT 'text',
    media_url TEXT,
    file_name TEXT,
    file_size INTEGER,
    is_forwarded BOOLEAN DEFAULT FALSE,
    forwarded_from INTEGER, -- Original message ID
    reply_to INTEGER, -- Message being replied to
    is_starred BOOLEAN DEFAULT FALSE,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (forwarded_from) REFERENCES messages(id),
    FOREIGN KEY (reply_to) REFERENCES messages(id)
);

-- Message status (delivery, read receipts)
CREATE TABLE IF NOT EXISTS message_status (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    status ENUM('sent', 'delivered', 'read') DEFAULT 'sent',
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (message_id) REFERENCES messages(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE(message_id, user_id)
);

-- Status/Stories table
CREATE TABLE IF NOT EXISTS status_updates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    content TEXT,
    media_url TEXT,
    media_type ENUM('text', 'image', 'video') DEFAULT 'text',
    background_color VARCHAR(7), -- Hex color for text status
    font_style VARCHAR(50),
    expires_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Status views (who viewed the status)
CREATE TABLE IF NOT EXISTS status_views (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    status_id INTEGER NOT NULL,
    viewer_id INTEGER NOT NULL,
    viewed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (status_id) REFERENCES status_updates(id) ON DELETE CASCADE,
    FOREIGN KEY (viewer_id) REFERENCES users(id),
    UNIQUE(status_id, viewer_id)
);

-- Contacts table (user relationships)
CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    contact_user_id INTEGER NOT NULL,
    display_name VARCHAR(255), -- Custom contact name
    is_blocked BOOLEAN DEFAULT FALSE,
    is_favorite BOOLEAN DEFAULT FALSE,
    added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (contact_user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(user_id, contact_user_id)
);

-- Call logs table
CREATE TABLE IF NOT EXISTS call_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    caller_id INTEGER NOT NULL,
    receiver_id INTEGER,
    chat_id INTEGER, -- For group calls
    call_type ENUM('voice', 'video') DEFAULT 'voice',
    call_status ENUM('missed', 'answered', 'declined', 'busy') DEFAULT 'missed',
    duration INTEGER DEFAULT 0, -- Call duration in seconds
    started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    ended_at DATETIME,
    FOREIGN KEY (caller_id) REFERENCES users(id),
    FOREIGN KEY (receiver_id) REFERENCES users(id),
    FOREIGN KEY (chat_id) REFERENCES chats(id)
);

-- Archive settings (which chats are archived for which users)
CREATE TABLE IF NOT EXISTS archived_chats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    chat_id INTEGER NOT NULL,
    archived_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE,
    UNIQUE(user_id, chat_id)
);

-- User settings and privacy
CREATE TABLE IF NOT EXISTS user_settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL UNIQUE,
    last_seen_privacy ENUM('everyone', 'contacts', 'nobody') DEFAULT 'contacts',
    profile_photo_privacy ENUM('everyone', 'contacts', 'nobody') DEFAULT 'everyone',
    about_privacy ENUM('everyone', 'contacts', 'nobody') DEFAULT 'contacts',
    status_privacy ENUM('everyone', 'contacts', 'contacts_except', 'only_share_with') DEFAULT 'contacts',
    read_receipts BOOLEAN DEFAULT TRUE,
    groups_privacy ENUM('everyone', 'contacts', 'contacts_except') DEFAULT 'contacts',
    notification_sound VARCHAR(100) DEFAULT 'default',
    notification_vibrate BOOLEAN DEFAULT TRUE,
    notification_popup ENUM('no_popup', 'only_when_screen_on', 'only_when_screen_off', 'always') DEFAULT 'only_when_screen_on',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_messages_chat_id ON messages(chat_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);
CREATE INDEX IF NOT EXISTS idx_chat_participants_chat_id ON chat_participants(chat_id);
CREATE INDEX IF NOT EXISTS idx_chat_participants_user_id ON chat_participants(user_id);
CREATE INDEX IF NOT EXISTS idx_status_updates_user_id ON status_updates(user_id);
CREATE INDEX IF NOT EXISTS idx_status_updates_expires_at ON status_updates(expires_at);
CREATE INDEX IF NOT EXISTS idx_contacts_user_id ON contacts(user_id);
CREATE INDEX IF NOT EXISTS idx_call_logs_caller_id ON call_logs(caller_id);
CREATE INDEX IF NOT EXISTS idx_call_logs_receiver_id ON call_logs(receiver_id);
