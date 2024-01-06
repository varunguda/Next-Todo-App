"use client";

import { useState } from "react";
import { trpc } from "../_trpc/client";
import { serverClient } from "../_trpc/serverClient";

const TodoList = ({
  initialData
} : {
  initialData: Awaited<ReturnType<(typeof serverClient)["getTodos"]>>
}) => {
  const [ todoContent, setTodoContent ] = useState();
  
  const getTodos = trpc.getTodos.useQuery(undefined, {
    initialData,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const addTodo = trpc.addTodo.useMutation({
    onSettled: () => {
      getTodos.refetch();
    }
  });
  
  const submitHandler = (e) => {
    e.preventDefault();
    if(!!todoContent){
      addTodo.mutate(todoContent);
      setTodoContent("");
    }
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <label htmlFor="todo-input">Enter your todo here: </label>
        <input value={todoContent} id="todo-input" type="text" onChange={(e) => setTodoContent(e.target.value)} />
        <button type="submit">Add</button>
      </form>
      <div>
        {getTodos.data?.map((todo) => (
          <p key={todo.id}>{todo.content} &nbsp;&nbsp;&nbsp;{todo.done ? "Completed" : "Incomplete"}</p>
        ))}
      </div>
    </>
  )
};

export default TodoList;

