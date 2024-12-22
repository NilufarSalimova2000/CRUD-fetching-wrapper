"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

interface FetchOptions extends RequestInit {
  headers?: HeadersInit;
}

export interface ErrorData {
  code: number;
  status: string;
  message: string;
}

// Define a generic FetchWrapper type
type FetchWrapper = <T>(url: string, options?: FetchOptions) => Promise<T>;

const fetchWrapper: FetchWrapper = async <T>(
  url: string,
  options: FetchOptions = {},
  revalidateTags?: string
): Promise<T> => {
  const token = cookies().get("accessToken")?.value;

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  const baseUrl = process.env.BACKEND_URL as string;

  const response = await fetch(`${baseUrl}${url}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = (await response.json()) as ErrorData;

    if (errorData.code === 401) {
      cookies().delete("accessToken");
      redirect("/register");
    }

    throw new Error(`Error ${response.status}: ${errorData.message}`);
  }
  if (revalidateTags) {
    revalidateTag(revalidateTags);
  }

  return response.json() as Promise<T>;
};

export default fetchWrapper;
