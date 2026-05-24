import type { SearchResponse } from "@/types";

const DEFAULT_API_URL = process.env.NODE_ENV === "development" ? "http://localhost:8000/api" : "";
const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_URL).replace(/\/$/, "");

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured.");
  }

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {})
    }
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json() as Promise<T>;
}

export async function hybridSearch(query: string): Promise<SearchResponse> {
  return apiFetch<SearchResponse>("/search/hybrid", {
    method: "POST",
    body: JSON.stringify({ query, limit: 12, filters: {} })
  });
}
