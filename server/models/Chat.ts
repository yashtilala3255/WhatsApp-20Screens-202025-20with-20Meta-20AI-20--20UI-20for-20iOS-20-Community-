import { getDatabase } from '../database/db';

export interface Chat {
  id: number;
  name?: string;
  description?: string;
  chat_type: 'individual' | 'group';
  avatar_url?: string;
  created_by?: number;
  created_at: string;
  updated_at: string;
  last_message?: string;
  last_message_time?: string;
  unread_count?: number;
}

export interface Message {
  id: number;
  chat_id: number;
  sender_id: number;
  content?: string;
  message_type: 'text' | 'image' | 'video' | 'audio' | 'document' | 'location';
  media_url?: string;
  file_name?: string;
  file_size?: number;
  is_forwarded: boolean;
  forwarded_from?: number;
  reply_to?: number;
  is_starred: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  sender_name?: string;
  sender_avatar?: string;
}

export interface CreateChatData {
  name?: string;
  description?: string;
  chat_type: 'individual' | 'group';
  created_by: number;
  participant_ids: number[];
}

export interface CreateMessageData {
  chat_id: number;
  sender_id: number;
  content?: string;
  message_type?: 'text' | 'image' | 'video' | 'audio' | 'document' | 'location';
  media_url?: string;
  file_name?: string;
  file_size?: number;
  reply_to?: number;
}

export class ChatModel {
  // Create a new chat
  static async create(chatData: CreateChatData): Promise<Chat> {
    const db = await getDatabase();
    
    // Start transaction
    await db.run('BEGIN TRANSACTION');
    
    try {
      // Create the chat
      const result = await db.run(`
        INSERT INTO chats (name, description, chat_type, created_by)
        VALUES (?, ?, ?, ?)
      `, [
        chatData.name || null,
        chatData.description || null,
        chatData.chat_type,
        chatData.created_by
      ]);

      const chatId = result.lastID;

      // Add participants
      for (const participantId of chatData.participant_ids) {
        const role = participantId === chatData.created_by ? 'admin' : 'member';
        await db.run(`
          INSERT INTO chat_participants (chat_id, user_id, role)
          VALUES (?, ?, ?)
        `, [chatId, participantId, role]);
      }

      await db.run('COMMIT');

      const chat = await db.get('SELECT * FROM chats WHERE id = ?', [chatId]);
      return chat as Chat;
    } catch (error) {
      await db.run('ROLLBACK');
      throw error;
    }
  }

  // Get chat by ID
  static async findById(id: number): Promise<Chat | null> {
    const db = await getDatabase();
    const chat = await db.get('SELECT * FROM chats WHERE id = ?', [id]);
    return chat as Chat || null;
  }

  // Get all chats for a user
  static async findByUserId(userId: number): Promise<Chat[]> {
    const db = await getDatabase();
    const chats = await db.all(`
      SELECT 
        c.*,
        (
          SELECT content 
          FROM messages m 
          WHERE m.chat_id = c.id 
          ORDER BY m.created_at DESC 
          LIMIT 1
        ) as last_message,
        (
          SELECT created_at 
          FROM messages m 
          WHERE m.chat_id = c.id 
          ORDER BY m.created_at DESC 
          LIMIT 1
        ) as last_message_time,
        (
          SELECT COUNT(*) 
          FROM messages m 
          LEFT JOIN message_status ms ON m.id = ms.message_id AND ms.user_id = ?
          WHERE m.chat_id = c.id AND m.sender_id != ? AND (ms.status IS NULL OR ms.status != 'read')
        ) as unread_count
      FROM chats c
      JOIN chat_participants cp ON c.id = cp.chat_id
      WHERE cp.user_id = ? AND cp.is_active = TRUE
      ORDER BY last_message_time DESC NULLS LAST
    `, [userId, userId, userId]);
    return chats as Chat[];
  }

  // Get chat participants
  static async getParticipants(chatId: number): Promise<any[]> {
    const db = await getDatabase();
    const participants = await db.all(`
      SELECT 
        u.id, u.first_name, u.last_name, u.phone_number, u.profile_image_url, u.about, u.is_online, u.last_seen,
        cp.role, cp.joined_at
      FROM users u
      JOIN chat_participants cp ON u.id = cp.user_id
      WHERE cp.chat_id = ? AND cp.is_active = TRUE
      ORDER BY cp.role DESC, u.first_name
    `, [chatId]);
    return participants;
  }

  // Add participant to chat
  static async addParticipant(chatId: number, userId: number, role: 'admin' | 'member' = 'member'): Promise<void> {
    const db = await getDatabase();
    await db.run(`
      INSERT INTO chat_participants (chat_id, user_id, role)
      VALUES (?, ?, ?)
      ON CONFLICT(chat_id, user_id) DO UPDATE SET
        is_active = TRUE,
        joined_at = CURRENT_TIMESTAMP,
        left_at = NULL
    `, [chatId, userId, role]);
  }

  // Remove participant from chat
  static async removeParticipant(chatId: number, userId: number): Promise<void> {
    const db = await getDatabase();
    await db.run(`
      UPDATE chat_participants 
      SET is_active = FALSE, left_at = CURRENT_TIMESTAMP
      WHERE chat_id = ? AND user_id = ?
    `, [chatId, userId]);
  }

  // Get messages for a chat
  static async getMessages(chatId: number, limit: number = 50, offset: number = 0): Promise<Message[]> {
    const db = await getDatabase();
    const messages = await db.all(`
      SELECT 
        m.*,
        u.first_name || ' ' || u.last_name as sender_name,
        u.profile_image_url as sender_avatar
      FROM messages m
      JOIN users u ON m.sender_id = u.id
      WHERE m.chat_id = ? AND m.is_deleted = FALSE
      ORDER BY m.created_at DESC
      LIMIT ? OFFSET ?
    `, [chatId, limit, offset]);
    return messages.reverse() as Message[]; // Reverse to show oldest first
  }

  // Create a new message
  static async createMessage(messageData: CreateMessageData): Promise<Message> {
    const db = await getDatabase();
    
    const result = await db.run(`
      INSERT INTO messages (chat_id, sender_id, content, message_type, media_url, file_name, file_size, reply_to)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      messageData.chat_id,
      messageData.sender_id,
      messageData.content || null,
      messageData.message_type || 'text',
      messageData.media_url || null,
      messageData.file_name || null,
      messageData.file_size || null,
      messageData.reply_to || null
    ]);

    const message = await db.get(`
      SELECT 
        m.*,
        u.first_name || ' ' || u.last_name as sender_name,
        u.profile_image_url as sender_avatar
      FROM messages m
      JOIN users u ON m.sender_id = u.id
      WHERE m.id = ?
    `, [result.lastID]);

    return message as Message;
  }

  // Star/unstar a message
  static async toggleStarMessage(messageId: number, userId: number): Promise<boolean> {
    const db = await getDatabase();
    
    const message = await db.get('SELECT is_starred FROM messages WHERE id = ?', [messageId]);
    if (!message) throw new Error('Message not found');

    const newStarred = !message.is_starred;
    await db.run('UPDATE messages SET is_starred = ? WHERE id = ?', [newStarred, messageId]);
    
    return newStarred;
  }

  // Get starred messages for a user
  static async getStarredMessages(userId: number): Promise<Message[]> {
    const db = await getDatabase();
    const messages = await db.all(`
      SELECT 
        m.*,
        u.first_name || ' ' || u.last_name as sender_name,
        u.profile_image_url as sender_avatar,
        c.name as chat_name,
        CASE 
          WHEN c.chat_type = 'individual' THEN (
            SELECT u2.first_name || ' ' || u2.last_name 
            FROM users u2 
            JOIN chat_participants cp2 ON u2.id = cp2.user_id 
            WHERE cp2.chat_id = c.id AND u2.id != ? 
            LIMIT 1
          )
          ELSE c.name
        END as chat_display_name
      FROM messages m
      JOIN users u ON m.sender_id = u.id
      JOIN chats c ON m.chat_id = c.id
      JOIN chat_participants cp ON c.id = cp.chat_id
      WHERE cp.user_id = ? AND m.is_starred = TRUE AND m.is_deleted = FALSE
      ORDER BY m.created_at DESC
    `, [userId, userId]);
    return messages as Message[];
  }

  // Search messages
  static async searchMessages(userId: number, query: string): Promise<Message[]> {
    const db = await getDatabase();
    const messages = await db.all(`
      SELECT 
        m.*,
        u.first_name || ' ' || u.last_name as sender_name,
        u.profile_image_url as sender_avatar,
        c.name as chat_name
      FROM messages m
      JOIN users u ON m.sender_id = u.id
      JOIN chats c ON m.chat_id = c.id
      JOIN chat_participants cp ON c.id = cp.chat_id
      WHERE cp.user_id = ? AND m.content LIKE ? AND m.is_deleted = FALSE
      ORDER BY m.created_at DESC
      LIMIT 100
    `, [userId, `%${query}%`]);
    return messages as Message[];
  }

  // Archive/unarchive chat for user
  static async toggleArchive(chatId: number, userId: number): Promise<boolean> {
    const db = await getDatabase();
    
    const archived = await db.get('SELECT 1 FROM archived_chats WHERE chat_id = ? AND user_id = ?', [chatId, userId]);
    
    if (archived) {
      await db.run('DELETE FROM archived_chats WHERE chat_id = ? AND user_id = ?', [chatId, userId]);
      return false;
    } else {
      await db.run('INSERT INTO archived_chats (chat_id, user_id) VALUES (?, ?)', [chatId, userId]);
      return true;
    }
  }

  // Get archived chats
  static async getArchivedChats(userId: number): Promise<Chat[]> {
    const db = await getDatabase();
    const chats = await db.all(`
      SELECT 
        c.*,
        ac.archived_at,
        (
          SELECT content 
          FROM messages m 
          WHERE m.chat_id = c.id 
          ORDER BY m.created_at DESC 
          LIMIT 1
        ) as last_message,
        (
          SELECT created_at 
          FROM messages m 
          WHERE m.chat_id = c.id 
          ORDER BY m.created_at DESC 
          LIMIT 1
        ) as last_message_time
      FROM chats c
      JOIN archived_chats ac ON c.id = ac.chat_id
      WHERE ac.user_id = ?
      ORDER BY ac.archived_at DESC
    `, [userId]);
    return chats as Chat[];
  }

  // Delete chat
  static async delete(id: number): Promise<boolean> {
    const db = await getDatabase();
    const result = await db.run('DELETE FROM chats WHERE id = ?', [id]);
    return (result.changes || 0) > 0;
  }

  // Update chat info
  static async update(id: number, data: { name?: string; description?: string; avatar_url?: string }): Promise<Chat | null> {
    const db = await getDatabase();
    
    const updateFields: string[] = [];
    const values: any[] = [];

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        updateFields.push(`${key} = ?`);
        values.push(value);
      }
    });

    if (updateFields.length === 0) {
      return await ChatModel.findById(id);
    }

    updateFields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);

    await db.run(`
      UPDATE chats 
      SET ${updateFields.join(', ')} 
      WHERE id = ?
    `, values);

    return await ChatModel.findById(id);
  }
}
