#!/usr/bin/env node

import { createServer, initializeServerDatabase, shutdownServer } from './index';

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    console.log('🚀 Starting WhatsApp Clone API server...');
    
    // Initialize database first
    await initializeServerDatabase();
    
    // Create and start server
    const app = createServer();
    
    const server = app.listen(PORT, () => {
      console.log(`🌐 Server running on port ${PORT}`);
      console.log(`📋 Health Check: http://localhost:${PORT}/api/health`);
      console.log(`👥 Users API: http://localhost:${PORT}/api/users`);
      console.log(`💬 Chats API: http://localhost:${PORT}/api/chats`);
      console.log('✨ WhatsApp Clone backend is ready!');
    });

    // Graceful shutdown handlers
    const shutdown = async () => {
      console.log('\n🛑 Shutting down gracefully...');
      server.close(async () => {
        await shutdownServer();
        process.exit(0);
      });
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

start();
