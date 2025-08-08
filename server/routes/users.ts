import express from 'express';
import { UserModel } from '../models/User';
import { z } from 'zod';

const router = express.Router();

// Validation schemas
const createUserSchema = z.object({
  phone_number: z.string().min(10).max(20),
  first_name: z.string().min(1).max(50),
  last_name: z.string().min(1).max(50),
  email: z.string().email().optional(),
  about: z.string().max(500).optional(),
  profile_image_url: z.string().url().optional(),
});

const updateUserSchema = z.object({
  first_name: z.string().min(1).max(50).optional(),
  last_name: z.string().min(1).max(50).optional(),
  email: z.string().email().optional(),
  about: z.string().max(500).optional(),
  profile_image_url: z.string().url().optional(),
  is_online: z.boolean().optional(),
});

const updateSettingsSchema = z.object({
  last_seen_privacy: z.enum(['everyone', 'contacts', 'nobody']).optional(),
  profile_photo_privacy: z.enum(['everyone', 'contacts', 'nobody']).optional(),
  about_privacy: z.enum(['everyone', 'contacts', 'nobody']).optional(),
  status_privacy: z.enum(['everyone', 'contacts', 'contacts_except', 'only_share_with']).optional(),
  read_receipts: z.boolean().optional(),
  groups_privacy: z.enum(['everyone', 'contacts', 'contacts_except']).optional(),
  notification_sound: z.string().optional(),
  notification_vibrate: z.boolean().optional(),
  notification_popup: z.enum(['no_popup', 'only_when_screen_on', 'only_when_screen_off', 'always']).optional(),
});

// GET /api/users - Get all users
router.get('/', async (req, res) => {
  try {
    const users = await UserModel.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// GET /api/users/:id - Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// GET /api/users/phone/:phoneNumber - Get user by phone number
router.get('/phone/:phoneNumber', async (req, res) => {
  try {
    const phoneNumber = req.params.phoneNumber;
    const user = await UserModel.findByPhoneNumber(phoneNumber);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user by phone:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// POST /api/users - Create new user
router.post('/', async (req, res) => {
  try {
    const validatedData = createUserSchema.parse(req.body);
    
    // Check if user already exists
    const existingUser = await UserModel.findByPhoneNumber(validatedData.phone_number);
    if (existingUser) {
      return res.status(409).json({ error: 'User with this phone number already exists' });
    }

    const user = await UserModel.create(validatedData);
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// PUT /api/users/:id - Update user
router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const validatedData = updateUserSchema.parse(req.body);
    const user = await UserModel.update(id, validatedData);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// DELETE /api/users/:id - Delete user
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const deleted = await UserModel.delete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// GET /api/users/:id/contacts - Get user contacts
router.get('/:id/contacts', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const contacts = await UserModel.getContacts(id);
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// GET /api/users/search/:query - Search users
router.get('/search/:query', async (req, res) => {
  try {
    const query = req.params.query;
    const excludeUserId = req.query.exclude ? parseInt(req.query.exclude as string) : undefined;
    
    const users = await UserModel.search(query, excludeUserId);
    res.json(users);
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).json({ error: 'Failed to search users' });
  }
});

// PUT /api/users/:id/online-status - Update online status
router.put('/:id/online-status', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const { is_online } = req.body;
    if (typeof is_online !== 'boolean') {
      return res.status(400).json({ error: 'is_online must be a boolean' });
    }

    await UserModel.updateOnlineStatus(id, is_online);
    res.json({ message: 'Online status updated' });
  } catch (error) {
    console.error('Error updating online status:', error);
    res.status(500).json({ error: 'Failed to update online status' });
  }
});

// GET /api/users/:id/settings - Get user settings
router.get('/:id/settings', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const settings = await UserModel.getSettings(id);
    res.json(settings);
  } catch (error) {
    console.error('Error fetching user settings:', error);
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

// PUT /api/users/:id/settings - Update user settings
router.put('/:id/settings', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const validatedData = updateSettingsSchema.parse(req.body);
    await UserModel.updateSettings(id, validatedData);
    
    const settings = await UserModel.getSettings(id);
    res.json(settings);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    console.error('Error updating user settings:', error);
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

export default router;
