import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { initializeDatabase, closeDatabase } from "./database/db";
import userRoutes from "./routes/users";
import chatRoutes from "./routes/chats";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({
      message: "WhatsApp Clone API is running!",
      timestamp: new Date().toISOString(),
      version: "1.0.0"
    });
  });

  // Database API routes
  app.use("/api/users", userRoutes);
  app.use("/api/chats", chatRoutes);

  // Legacy routes for compatibility
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "WhatsApp Clone Backend";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Error handling middleware
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('API Error:', err);
    res.status(500).json({
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
  });

  return app;
}

// Initialize database when server starts
let dbInitialized = false;

export async function initializeServerDatabase() {
  if (!dbInitialized) {
    try {
      console.log('🗄️  Initializing WhatsApp Clone database...');
      await initializeDatabase();
      console.log('✅ Database initialized successfully');
      dbInitialized = true;
    } catch (error) {
      console.error('❌ Failed to initialize database:', error);
      throw error;
    }
  }
}

// Graceful shutdown
export async function shutdownServer() {
  if (dbInitialized) {
    console.log('🛑 Shutting down database connection...');
    await closeDatabase();
    dbInitialized = false;
  }
}
