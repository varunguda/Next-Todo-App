import { initTRPC } from "@trpc/server";

const t = initTRPC.create();

export const { router, createCallerFactory } = t;
export const publicProcedure = t.procedure;


