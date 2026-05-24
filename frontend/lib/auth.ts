import { apiFetch } from "@/lib/api";

export async function login(email: string, password: string) {
  const token = await apiFetch<{ access_token: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });
  localStorage.setItem("token", token.access_token);
  return token;
}
