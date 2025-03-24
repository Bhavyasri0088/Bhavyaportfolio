import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import fs from "fs";
import { insertContactMessageSchema, insertProjectSchema } from "@shared/schema";
import { ZodError } from "zod";

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

  // API routes for Projects
  
  // Get all projects
  app.get('/api/projects', async (req: Request, res: Response) => {
    try {
      const projects = await storage.getAllProjects();
      return res.status(200).json(projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch projects' 
      });
    }
  });
  
  // Get a specific project by ID
  app.get('/api/projects/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid project ID' 
        });
      }
      
      const project = await storage.getProject(id);
      if (!project) {
        return res.status(404).json({ 
          success: false, 
          message: 'Project not found' 
        });
      }
      
      return res.status(200).json(project);
    } catch (error) {
      console.error('Error fetching project:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch project' 
      });
    }
  });
  
  // Create a new project
  app.post('/api/projects', async (req: Request, res: Response) => {
    try {
      // Validate request body against schema
      const projectData = insertProjectSchema.parse(req.body);
      
      // Create the project
      const newProject = await storage.createProject(projectData);
      
      return res.status(201).json(newProject);
    } catch (error) {
      console.error('Error creating project:', error);
      
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid project data', 
          errors: error.errors 
        });
      }
      
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to create project' 
      });
    }
  });

  // API routes for Contact Messages
  
  // API endpoint for contact form submissions
  app.post('/api/contact', async (req: Request, res: Response) => {
    try {
      // Validate request body against schema
      const messageData = insertContactMessageSchema.parse(req.body);
      
      // Create the contact message
      const newMessage = await storage.createContactMessage(messageData);
      
      return res.status(201).json({ 
        success: true, 
        message: 'Message received successfully',
        id: newMessage.id 
      });
    } catch (error) {
      console.error('Error processing contact message:', error);
      
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid message data', 
          errors: error.errors 
        });
      }
      
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to process message' 
      });
    }
  });
  
  // Get all contact messages (admin route)
  app.get('/api/contact', async (req: Request, res: Response) => {
    try {
      const messages = await storage.getAllContactMessages();
      return res.status(200).json(messages);
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch contact messages' 
      });
    }
  });
  
  // Mark a contact message as read (admin route)
  app.patch('/api/contact/:id/read', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid message ID' 
        });
      }
      
      const message = await storage.markMessageAsRead(id);
      if (!message) {
        return res.status(404).json({ 
          success: false, 
          message: 'Message not found' 
        });
      }
      
      return res.status(200).json(message);
    } catch (error) {
      console.error('Error marking message as read:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to mark message as read' 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
