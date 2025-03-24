import { drizzle } from 'drizzle-orm/postgres-js';
import { neon, neonConfig } from '@neondatabase/serverless';
import { users, projects, contactMessages } from '../shared/schema';

// Optional: Disable SSL for local development
// neonConfig.useSecureWebSockets = false;

// Use environment variables
const connectionString = process.env.DATABASE_URL!;

// Create a client
const sql = neon(connectionString);

// Create a Drizzle ORM instance
export const db = drizzle(sql);

// Export database methods
export const getAllProjects = async () => {
  return await db.select().from(projects).orderBy(projects.createdAt);
};

export const getProjectById = async (id: number) => {
  const result = await db.select().from(projects).where(({ and, eq }) => eq(projects.id, id));
  return result[0];
};

export const createProject = async (project: any) => {
  const result = await db.insert(projects).values(project).returning();
  return result[0];
};

export const getAllContactMessages = async () => {
  return await db.select().from(contactMessages).orderBy(contactMessages.createdAt);
};

export const createContactMessage = async (message: any) => {
  const result = await db.insert(contactMessages).values(message).returning();
  return result[0];
};

export const markMessageAsRead = async (id: number) => {
  const result = await db
    .update(contactMessages)
    .set({ read: true })
    .where(({ eq }) => eq(contactMessages.id, id))
    .returning();
  return result[0];
};