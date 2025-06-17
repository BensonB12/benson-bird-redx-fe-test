import { PrismaClient } from "@prisma/client";

declare global {
  var __db__: PrismaClient;
}

let db: PrismaClient;

// This is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
// In production, we'll have a single long-running process.
if (process.env.NODE_ENV === "production") {
  db = getClient();
} else {
  if (!global.__db__) {
    global.__db__ = getClient();
  }
  db = global.__db__;
}

function getClient() {
  console.log("🔌 Connecting to database...");
  
  const client = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

  // Connect eagerly
  client.$connect();

  return client;
}

export { db }; 