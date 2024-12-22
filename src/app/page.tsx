import { Card } from "@/components/card";
import { UserForm } from "@/components/user-form";
import fetchWrapper from "@/config/fetch-wrapper";
import { responceTodoT } from "@/service/mutation/types";
import { getTodoData } from "@/service/query/todo-service";

export default async function Home() {
  const data = await fetchWrapper<responceTodoT[]>("/todos", {
    next: { tags: ["todos"] },
  });

  return (
    <div className="container max-w-[1200px] mx-auto">
      <UserForm />
      {data.map((item) => (
        <Card key={item.id} {...item} />
      ))}
    </div>
  );
}
