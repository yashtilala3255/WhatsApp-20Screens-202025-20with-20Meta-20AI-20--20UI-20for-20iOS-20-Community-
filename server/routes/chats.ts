import express from "express";
import { ChatModel } from "../models/Chat";
import { z } from "zod";

const router = express.Router();

// Validation schemas
const createChatSchema = z.object({
  name: z.string().max(255).optional(),
  description: z.string().max(500).optional(),
  chat_type: z.enum(["individual", "group"]),
  created_by: z.number(),
  participant_ids: z.array(z.number()).min(1),
});

const createMessageSchema = z.object({
  content: z.string().max(4096).optional(),
  message_type: z
    .enum(["text", "image", "video", "audio", "document", "location"])
    .default("text"),
  media_url: z.string().url().optional(),
  file_name: z.string().optional(),
  file_size: z.number().optional(),
  reply_to: z.number().optional(),
});

const updateChatSchema = z.object({
  name: z.string().max(255).optional(),
  description: z.string().max(500).optional(),
  avatar_url: z.string().url().optional(),
});

// GET /api/chats/user/:userId - Get all chats for a user
router.get("/user/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const chats = await ChatModel.findByUserId(userId);
    res.json(chats);
  } catch (error) {
    console.error("Error fetching user chats:", error);
    res.status(500).json({ error: "Failed to fetch chats" });
  }
});

// GET /api/chats/:id - Get chat by ID
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid chat ID" });
    }

    const chat = await ChatModel.findById(id);
    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    res.json(chat);
  } catch (error) {
    console.error("Error fetching chat:", error);
    res.status(500).json({ error: "Failed to fetch chat" });
  }
});

// POST /api/chats - Create new chat
router.post("/", async (req, res) => {
  try {
    const validatedData = createChatSchema.parse(req.body);
    const chat = await ChatModel.create(validatedData);
    res.status(201).json(chat);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ error: "Validation failed", details: error.errors });
    }
    console.error("Error creating chat:", error);
    res.status(500).json({ error: "Failed to create chat" });
  }
});

// PUT /api/chats/:id - Update chat
router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid chat ID" });
    }

    const validatedData = updateChatSchema.parse(req.body);
    const chat = await ChatModel.update(id, validatedData);

    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    res.json(chat);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ error: "Validation failed", details: error.errors });
    }
    console.error("Error updating chat:", error);
    res.status(500).json({ error: "Failed to update chat" });
  }
});

// DELETE /api/chats/:id - Delete chat
router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid chat ID" });
    }

    const deleted = await ChatModel.delete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Chat not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting chat:", error);
    res.status(500).json({ error: "Failed to delete chat" });
  }
});

// GET /api/chats/:id/participants - Get chat participants
router.get("/:id/participants", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid chat ID" });
    }

    const participants = await ChatModel.getParticipants(id);
    res.json(participants);
  } catch (error) {
    console.error("Error fetching participants:", error);
    res.status(500).json({ error: "Failed to fetch participants" });
  }
});

// POST /api/chats/:id/participants - Add participant to chat
router.post("/:id/participants", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid chat ID" });
    }

    const { user_id, role = "member" } = req.body;
    if (!user_id || typeof user_id !== "number") {
      return res
        .status(400)
        .json({ error: "user_id is required and must be a number" });
    }

    await ChatModel.addParticipant(id, user_id, role);
    res.json({ message: "Participant added successfully" });
  } catch (error) {
    console.error("Error adding participant:", error);
    res.status(500).json({ error: "Failed to add participant" });
  }
});

// DELETE /api/chats/:id/participants/:userId - Remove participant from chat
router.delete("/:id/participants/:userId", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const userId = parseInt(req.params.userId);

    if (isNaN(id) || isNaN(userId)) {
      return res.status(400).json({ error: "Invalid chat ID or user ID" });
    }

    await ChatModel.removeParticipant(id, userId);
    res.json({ message: "Participant removed successfully" });
  } catch (error) {
    console.error("Error removing participant:", error);
    res.status(500).json({ error: "Failed to remove participant" });
  }
});

// GET /api/chats/:id/messages - Get messages for a chat
router.get("/:id/messages", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid chat ID" });
    }

    const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
    const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;

    const messages = await ChatModel.getMessages(id, limit, offset);
    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// POST /api/chats/:id/messages - Create new message
router.post("/:id/messages", async (req, res) => {
  try {
    const chatId = parseInt(req.params.id);
    if (isNaN(chatId)) {
      return res.status(400).json({ error: "Invalid chat ID" });
    }

    const { sender_id } = req.body;
    if (!sender_id || typeof sender_id !== "number") {
      return res
        .status(400)
        .json({ error: "sender_id is required and must be a number" });
    }

    const validatedData = createMessageSchema.parse(req.body);
    const messageData = {
      ...validatedData,
      chat_id: chatId,
      sender_id,
    };

    const message = await ChatModel.createMessage(messageData);
    res.status(201).json(message);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ error: "Validation failed", details: error.errors });
    }
    console.error("Error creating message:", error);
    res.status(500).json({ error: "Failed to create message" });
  }
});

// PUT /api/chats/messages/:messageId/star - Star/unstar a message
router.put("/messages/:messageId/star", async (req, res) => {
  try {
    const messageId = parseInt(req.params.messageId);
    if (isNaN(messageId)) {
      return res.status(400).json({ error: "Invalid message ID" });
    }

    const { user_id } = req.body;
    if (!user_id || typeof user_id !== "number") {
      return res
        .status(400)
        .json({ error: "user_id is required and must be a number" });
    }

    const isStarred = await ChatModel.toggleStarMessage(messageId, user_id);
    res.json({ is_starred: isStarred });
  } catch (error) {
    console.error("Error toggling star message:", error);
    res.status(500).json({ error: "Failed to toggle star message" });
  }
});

// GET /api/chats/user/:userId/starred - Get starred messages for user
router.get("/user/:userId/starred", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const messages = await ChatModel.getStarredMessages(userId);
    res.json(messages);
  } catch (error) {
    console.error("Error fetching starred messages:", error);
    res.status(500).json({ error: "Failed to fetch starred messages" });
  }
});

// GET /api/chats/user/:userId/search - Search messages for user
router.get("/user/:userId/search", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const query = req.query.q as string;
    if (!query || query.trim().length === 0) {
      return res.status(400).json({ error: "Search query is required" });
    }

    const messages = await ChatModel.searchMessages(userId, query.trim());
    res.json(messages);
  } catch (error) {
    console.error("Error searching messages:", error);
    res.status(500).json({ error: "Failed to search messages" });
  }
});

// PUT /api/chats/:id/archive - Archive/unarchive chat for user
router.put("/:id/archive", async (req, res) => {
  try {
    const chatId = parseInt(req.params.id);
    if (isNaN(chatId)) {
      return res.status(400).json({ error: "Invalid chat ID" });
    }

    const { user_id } = req.body;
    if (!user_id || typeof user_id !== "number") {
      return res
        .status(400)
        .json({ error: "user_id is required and must be a number" });
    }

    const isArchived = await ChatModel.toggleArchive(chatId, user_id);
    res.json({ is_archived: isArchived });
  } catch (error) {
    console.error("Error toggling archive:", error);
    res.status(500).json({ error: "Failed to toggle archive" });
  }
});

// GET /api/chats/user/:userId/archived - Get archived chats for user
router.get("/user/:userId/archived", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const chats = await ChatModel.getArchivedChats(userId);
    res.json(chats);
  } catch (error) {
    console.error("Error fetching archived chats:", error);
    res.status(500).json({ error: "Failed to fetch archived chats" });
  }
});

export default router;
