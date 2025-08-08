import { getDatabase } from '../database/db';

export interface User {
  id: number;
  phone_number: string;
  first_name: string;
  last_name: string;
  email?: string;
  profile_image_url?: string;
  about: string;
  last_seen: string;
  is_online: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateUserData {
  phone_number: string;
  first_name: string;
  last_name: string;
  email?: string;
  about?: string;
  profile_image_url?: string;
}

export interface UpdateUserData {
  first_name?: string;
  last_name?: string;
  email?: string;
  about?: string;
  profile_image_url?: string;
  is_online?: boolean;
}

export class UserModel {
  // Create a new user
  static async create(userData: CreateUserData): Promise<User> {
    const db = await getDatabase();
    
    const result = await db.run(`
      INSERT INTO users (phone_number, first_name, last_name, email, about, profile_image_url)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
      userData.phone_number,
      userData.first_name,
      userData.last_name,
      userData.email || null,
      userData.about || 'Hey there! I am using WhatsApp.',
      userData.profile_image_url || null
    ]);

    const user = await db.get('SELECT * FROM users WHERE id = ?', [result.lastID]);
    return user as User;
  }

  // Get user by ID
  static async findById(id: number): Promise<User | null> {
    const db = await getDatabase();
    const user = await db.get('SELECT * FROM users WHERE id = ?', [id]);
    return user as User || null;
  }

  // Get user by phone number
  static async findByPhoneNumber(phoneNumber: string): Promise<User | null> {
    const db = await getDatabase();
    const user = await db.get('SELECT * FROM users WHERE phone_number = ?', [phoneNumber]);
    return user as User || null;
  }

  // Get all users
  static async findAll(): Promise<User[]> {
    const db = await getDatabase();
    const users = await db.all('SELECT * FROM users ORDER BY first_name, last_name');
    return users as User[];
  }

  // Update user
  static async update(id: number, userData: UpdateUserData): Promise<User | null> {
    const db = await getDatabase();
    
    const updateFields: string[] = [];
    const values: any[] = [];

    Object.entries(userData).forEach(([key, value]) => {
      if (value !== undefined) {
        updateFields.push(`${key} = ?`);
        values.push(value);
      }
    });

    if (updateFields.length === 0) {
      return await UserModel.findById(id);
    }

    // Add updated_at
    updateFields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);

    await db.run(`
      UPDATE users 
      SET ${updateFields.join(', ')} 
      WHERE id = ?
    `, values);

    return await UserModel.findById(id);
  }

  // Delete user
  static async delete(id: number): Promise<boolean> {
    const db = await getDatabase();
    const result = await db.run('DELETE FROM users WHERE id = ?', [id]);
    return (result.changes || 0) > 0;
  }

  // Update user online status
  static async updateOnlineStatus(id: number, isOnline: boolean): Promise<void> {
    const db = await getDatabase();
    await db.run(`
      UPDATE users 
      SET is_online = ?, last_seen = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `, [isOnline, id]);
  }

  // Get user contacts
  static async getContacts(userId: number): Promise<User[]> {
    const db = await getDatabase();
    const contacts = await db.all(`
      SELECT u.*, c.display_name, c.is_favorite, c.is_blocked
      FROM users u
      JOIN contacts c ON u.id = c.contact_user_id
      WHERE c.user_id = ? AND c.is_blocked = FALSE
      ORDER BY u.first_name, u.last_name
    `, [userId]);
    return contacts as User[];
  }

  // Search users by name or phone
  static async search(query: string, excludeUserId?: number): Promise<User[]> {
    const db = await getDatabase();
    let sql = `
      SELECT * FROM users 
      WHERE (first_name LIKE ? OR last_name LIKE ? OR phone_number LIKE ?)
    `;
    const params = [`%${query}%`, `%${query}%`, `%${query}%`];

    if (excludeUserId) {
      sql += ' AND id != ?';
      params.push(excludeUserId);
    }

    sql += ' ORDER BY first_name, last_name LIMIT 50';

    const users = await db.all(sql, params);
    return users as User[];
  }

  // Check if user exists
  static async exists(phoneNumber: string): Promise<boolean> {
    const db = await getDatabase();
    const result = await db.get('SELECT 1 FROM users WHERE phone_number = ?', [phoneNumber]);
    return !!result;
  }

  // Get user settings
  static async getSettings(userId: number): Promise<any> {
    const db = await getDatabase();
    const settings = await db.get('SELECT * FROM user_settings WHERE user_id = ?', [userId]);
    return settings;
  }

  // Update user settings
  static async updateSettings(userId: number, settings: any): Promise<void> {
    const db = await getDatabase();
    
    const updateFields: string[] = [];
    const values: any[] = [];

    Object.entries(settings).forEach(([key, value]) => {
      if (value !== undefined && key !== 'user_id') {
        updateFields.push(`${key} = ?`);
        values.push(value);
      }
    });

    if (updateFields.length === 0) return;

    updateFields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(userId);

    await db.run(`
      UPDATE user_settings 
      SET ${updateFields.join(', ')} 
      WHERE user_id = ?
    `, values);
  }
}
