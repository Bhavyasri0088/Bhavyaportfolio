import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import fs from "fs";

export async function registerRoutes(app: Express): Promise<Server> {
  // Static route for serving the hero image
  app.get('/static/aibg.jpg', (req, res) => {
    const imagePath = path.join(process.cwd(), 'client', 'public', 'aibg.jpg');
    
    // Check if the file exists
    if (fs.existsSync(imagePath)) {
      res.sendFile(imagePath);
    } else {
      // If the specific image doesn't exist, send a placeholder or error
      res.status(404).send('Image not found');
    }
  });

  // API endpoint for contact form submissions
  app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    
    // Input validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // In a real implementation, you would store the contact submission
    // or send an email with the information
    
    return res.status(200).json({ 
      success: true, 
      message: 'Message received successfully' 
    });
  });

  // Other API routes would go here

  const httpServer = createServer(app);

  return httpServer;
}
