import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';
import fs from 'fs';

// Database interface
export interface WhatsAppDB extends Database<sqlite3.Database, sqlite3.Statement> {}

let db: WhatsAppDB | null = null;

// Initialize database connection
export async function initializeDatabase(): Promise<WhatsAppDB> {
  if (db) {
    return db;
  }

  try {
    // Create database directory if it doesn't exist
    const dbDir = path.join(process.cwd(), 'server', 'database');
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }

    // Open database connection
    db = await open({
      filename: path.join(dbDir, 'whatsapp.db'),
      driver: sqlite3.Database,
    });

    // Enable foreign keys
    await db.exec('PRAGMA foreign_keys = ON;');

    // Read and execute schema
    const schemaPath = path.join(dbDir, 'schema.sql');
    if (fs.existsSync(schemaPath)) {
      const schema = fs.readFileSync(schemaPath, 'utf8');
      await db.exec(schema);
      console.log('✅ Database schema initialized successfully');
    }

    // Seed with sample data in development
    if (process.env.NODE_ENV !== 'production') {
      await seedDatabase(db);
    }

    return db;
  } catch (error) {
    console.error('❌ Failed to initialize database:', error);
    throw error;
  }
}

// Get database instance
export async function getDatabase(): Promise<WhatsAppDB> {
  if (!db) {
    return await initializeDatabase();
  }
  return db;
}

// Seed database with sample data
async function seedDatabase(database: WhatsAppDB) {
  try {
    // Check if users already exist
    const userCount = await database.get('SELECT COUNT(*) as count FROM users');
    if (userCount?.count > 0) {
      console.log('📊 Database already seeded');
      return;
    }

    console.log('🌱 Seeding database with sample data...');

    // Insert sample users
    const users = [
      {
        phone_number: '+1555012301',
        first_name: 'Marty',
        last_name: 'McFly',
        email: 'marty@hillvalley.com',
        about: 'Just a regular teenager... from 1985',
        profile_image_url: 'https://api.builder.io/api/v1/image/assets/TEMP/7a8c2c85?width=116',
      },
      {
        phone_number: '+1555012402',
        first_name: 'Doc',
        last_name: 'Brown',
        email: 'doc@timetravel.com',
        about: 'Great Scott! 1.21 gigawatts!',
        profile_image_url: 'https://api.builder.io/api/v1/image/assets/TEMP/4c4a5af127d840b7402719dbbfdd77f20d2b99a7?width=116',
      },
      {
        phone_number: '+1555012503',
        first_name: 'Jennifer',
        last_name: 'Parker',
        email: 'jennifer@hillvalley.com',
        about: 'Living life one day at a time',
        profile_image_url: 'https://api.builder.io/api/v1/image/assets/TEMP/2f74a7b374d94e89d563d84ba3c9febd0fc2b66c?width=116',
      },
      {
        phone_number: '+1555012604',
        first_name: 'George',
        last_name: 'McFly',
        email: 'george@writer.com',
        about: 'Writer and dreamer',
        profile_image_url: 'https://api.builder.io/api/v1/image/assets/TEMP/george-avatar?width=116',
      },
      {
        phone_number: '+1555012705',
        first_name: 'Lorraine',
        last_name: 'Baines',
        email: 'lorraine@hillvalley.com',
        about: 'Happy to be living in Hill Valley',
        profile_image_url: 'https://api.builder.io/api/v1/image/assets/TEMP/lorraine-avatar?width=116',
      }
    ];

    for (const user of users) {
      await database.run(`
        INSERT INTO users (phone_number, first_name, last_name, email, about, profile_image_url)
        VALUES (?, ?, ?, ?, ?, ?)
      `, [user.phone_number, user.first_name, user.last_name, user.email, user.about, user.profile_image_url]);
    }

    // Create individual chats
    await database.run(`
      INSERT INTO chats (chat_type) VALUES ('individual')
    `);
    
    const chatId = await database.get('SELECT last_insert_rowid() as id');
    
    // Add participants to chat (Marty and Doc)
    await database.run(`
      INSERT INTO chat_participants (chat_id, user_id) VALUES (?, 1), (?, 2)
    `, [chatId?.id, chatId?.id]);

    // Create group chat
    await database.run(`
      INSERT INTO chats (name, description, chat_type, created_by)
      VALUES ('Hill Valley High School', 'Class of 1985 - Stay connected!', 'group', 1)
    `);

    const groupChatId = await database.get('SELECT last_insert_rowid() as id');

    // Add participants to group chat
    for (let i = 1; i <= 5; i++) {
      await database.run(`
        INSERT INTO chat_participants (chat_id, user_id, role)
        VALUES (?, ?, ?)
      `, [groupChatId?.id, i, i === 1 ? 'admin' : 'member']);
    }

    // Insert sample messages
    const messages = [
      {
        chat_id: chatId?.id,
        sender_id: 1,
        content: 'Great Scott! We need to get back to 1985!',
        message_type: 'text'
      },
      {
        chat_id: chatId?.id,
        sender_id: 2,
        content: 'The DeLorean is ready for another time jump',
        message_type: 'text'
      },
      {
        chat_id: groupChatId?.id,
        sender_id: 1,
        content: 'Welcome to the class of 1985!',
        message_type: 'text'
      }
    ];

    for (const message of messages) {
      await database.run(`
        INSERT INTO messages (chat_id, sender_id, content, message_type)
        VALUES (?, ?, ?, ?)
      `, [message.chat_id, message.sender_id, message.content, message.message_type]);
    }

    // Create status updates
    await database.run(`
      INSERT INTO status_updates (user_id, content, media_type, expires_at)
      VALUES (1, 'Time traveling again! 🚗⚡', 'text', datetime('now', '+24 hours'))
    `);

    // Create user settings for all users
    for (let i = 1; i <= 5; i++) {
      await database.run(`
        INSERT INTO user_settings (user_id) VALUES (?)
      `, [i]);
    }

    console.log('✅ Database seeded successfully');
  } catch (error) {
    console.error('❌ Failed to seed database:', error);
  }
}

// Close database connection
export async function closeDatabase(): Promise<void> {
  if (db) {
    await db.close();
    db = null;
    console.log('📋 Database connection closed');
  }
}

// Helper function to run migrations
export async function runMigrations(): Promise<void> {
  const database = await getDatabase();
  
  // Create migrations table if it doesn't exist
  await database.exec(`
    CREATE TABLE IF NOT EXISTS migrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(255) NOT NULL UNIQUE,
      executed_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Add your migrations here as needed
  console.log('🔄 Migrations completed');
}
