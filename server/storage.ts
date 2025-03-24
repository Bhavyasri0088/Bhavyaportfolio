import { 
  users, 
  type User, 
  type InsertUser, 
  projects, 
  type Project, 
  type InsertProject,
  contactMessages,
  type ContactMessage,
  type InsertContactMessage
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Project operations
  getAllProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  
  // Contact message operations
  getAllContactMessages(): Promise<ContactMessage[]>;
  getContactMessage(id: number): Promise<ContactMessage | undefined>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  markMessageAsRead(id: number): Promise<ContactMessage | undefined>;
}

// In-Memory Storage Implementation (for development/testing)
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private contactMessages: Map<number, ContactMessage>;
  private currentUserId: number;
  private currentProjectId: number;
  private currentMessageId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.contactMessages = new Map();
    this.currentUserId = 1;
    this.currentProjectId = 1;
    this.currentMessageId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const now = new Date();
    // Ensure email is defined as null if not provided
    const email = insertUser.email !== undefined ? insertUser.email : null;
    
    const user: User = { 
      ...insertUser, 
      id, 
      email,
      isAdmin: false,
      createdAt: now
    };
    this.users.set(id, user);
    return user;
  }
  
  // Project methods
  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }
  
  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }
  
  async createProject(project: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const now = new Date();
    
    // Ensure all fields have proper values to match Project type
    const insights = project.insights !== undefined ? project.insights : null;
    const technologies = project.technologies !== undefined ? project.technologies : null;
    const reportUrl = project.reportUrl !== undefined ? project.reportUrl : null;
    
    const newProject: Project = {
      ...project,
      id,
      insights,
      technologies,
      reportUrl,
      createdAt: now
    };
    
    this.projects.set(id, newProject);
    return newProject;
  }
  
  // Contact message methods
  async getAllContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }
  
  async getContactMessage(id: number): Promise<ContactMessage | undefined> {
    return this.contactMessages.get(id);
  }
  
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentMessageId++;
    const now = new Date();
    const newMessage: ContactMessage = {
      ...message,
      id,
      read: false,
      createdAt: now
    };
    this.contactMessages.set(id, newMessage);
    return newMessage;
  }
  
  async markMessageAsRead(id: number): Promise<ContactMessage | undefined> {
    const message = this.contactMessages.get(id);
    if (!message) return undefined;
    
    const updatedMessage = { ...message, read: true };
    this.contactMessages.set(id, updatedMessage);
    return updatedMessage;
  }
}

// PostgreSQL Storage Implementation
export class PgStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }
  
  // Project methods
  async getAllProjects(): Promise<Project[]> {
    return await db.select().from(projects).orderBy(projects.createdAt);
  }
  
  async getProject(id: number): Promise<Project | undefined> {
    const result = await db.select().from(projects).where(eq(projects.id, id));
    return result[0];
  }
  
  async createProject(project: InsertProject): Promise<Project> {
    const result = await db.insert(projects).values(project).returning();
    return result[0];
  }
  
  // Contact message methods
  async getAllContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages).orderBy(contactMessages.createdAt);
  }
  
  async getContactMessage(id: number): Promise<ContactMessage | undefined> {
    const result = await db.select().from(contactMessages).where(eq(contactMessages.id, id));
    return result[0];
  }
  
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const result = await db.insert(contactMessages).values(message).returning();
    return result[0];
  }
  
  async markMessageAsRead(id: number): Promise<ContactMessage | undefined> {
    const result = await db
      .update(contactMessages)
      .set({ read: true })
      .where(eq(contactMessages.id, id))
      .returning();
    return result[0];
  }
}

// Choose which storage implementation to use based on environment
// For production, use PgStorage
export const storage = process.env.NODE_ENV === 'production' 
  ? new PgStorage() 
  : new PgStorage(); // Using PgStorage for both environments since we have a database
