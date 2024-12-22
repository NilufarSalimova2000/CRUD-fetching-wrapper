"use server";
const url = process.env.BACKEND_URL;
import { revalidateTag } from "next/cache";

export const deleteTodo = async (id: number | string) => {
  const res = await fetch(`${url}/todos/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Error bu userni o'chirib bo'lmaydi");
  }
  revalidateTag("todo-data");

  const data = await res.json();

  return data;
};

export const createTodo = async (obj: {
  title: string;
  description: string;
}) => {
  const res = await fetch(`${url}/todos`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(obj),
  });
  if (!res.ok) {
    throw new Error("user yaratilmadi ");
  }
  revalidateTag("todo-data");
  const data = res.json();

  return data;
};

export const editTodo = async (obj: {
  title: string;
  description: string;
  id?: number | string;
}) => {
  const res = await fetch(`${url}/todos/${obj.id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(obj),
  });
  if (!res.ok) {
    throw new Error("user yaratilmadi ");
  }
  revalidateTag("todo-data");
  const data = res.json();

  return data;
};
