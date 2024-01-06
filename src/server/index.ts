import Database from "better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { router, publicProcedure } from "./trpc";
import { todos } from "@/db/schema";
import { z } from "zod";
import { createCallerFactory } from "@trpc/server";

const sqllite = new Database("sqllite.db");
const db = drizzle(sqllite);

migrate(db, { migrationsFolder: "drizzle" });

export const appRouter = router({
  
  getTodos: publicProcedure.query(async () => {
    return await db.select().from(todos).all();
  }),

  addTodo: publicProcedure.input(z.string()).mutation(async({ input }) => {
    await db.insert(todos).values({ content: input, done: 0 }).run();
    return true;
  })
})

const createCaller = createCallerFactory();

export const caller = createCaller(appRouter)({});

export type AppRouter = typeof appRouter;
