import Link from "next/link";
import TodoList from "./_components/TodoList";
import { caller } from "@/server";
// import { serverClient } from "./_trpc/serverClient";

export default async function Home() {
  // const todos = await serverClient.getTodos();
  const todos = await caller.getTodos(); 
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href={"/about"}>
        About
      </Link>
      <TodoList initialData={todos} />
    </main>
  )
}
