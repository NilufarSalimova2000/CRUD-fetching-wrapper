"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { createTodo, editTodo } from "@/service/mutation/todo-mutation";
import { Spinner } from "./spinner";

const createUserSchema = z.object({
  title: z.string().min(3, "eng kam qiymat 3 ta bratishka"),
  description: z.string().min(3, "eng kam qiymat 3 ta bratan"),
});

type IFormInput = z.infer<typeof createUserSchema>;

interface defaultValue {
  title?: string;
  description?: string;
  id?: string | number;
  setIsopen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserForm = (defaultValues: defaultValue) => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(createUserSchema),
    defaultValues: defaultValues || {},
  });

  const [transition, setTransition] = React.useTransition();

  const submit = (data: IFormInput) => {
    setTransition(async () => {
      if (defaultValues.id) {
        try {
          const res = await editTodo({
            description: data.description,
            title: data.title,
            id: defaultValues.id,
          });
          if (defaultValues.setIsopen) {
            defaultValues.setIsopen(false);
          }
        } catch (error) { }

        return;
      }
      try {
        const res = await createTodo(data);
        console.log(res);
      } catch (error) { }
    });
    reset();
  };

  return (
    <form className="w-[400px] py-5" onSubmit={handleSubmit(submit)}>
      <div className="mt-[10px]">
        <input
          className="p-[20px] w-[100%] bg-pink-200 placeholder:text-white rounded"
          type="text"
          placeholder="Title"
          {...register("title")}
        />
      </div>
      <div className="mt-[10px]">
        <input
          className="p-[20px] w-[100%] bg-pink-300  placeholder:text-white rounded"
          type="text"
          placeholder="Description"
          {...register("description")}
        />
      </div>
      <div className="mt-[10px] w-[100%]">
        <button className="bg-red-300 p-[10px] rounded text-white" type="submit">
          {transition && <Spinner />} {defaultValues.id ? "edit" : "Send"}
        </button>
      </div>
    </form>
  );
};
