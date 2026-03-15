const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("interest_badge_token");
}

export function saveToken(token: string): void {
  localStorage.setItem("interest_badge_token", token);
}

export function getUser(): any {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem("interest_badge_user");
  return user ? JSON.parse(user) : null;
}

export function saveUser(user: any): void {
  localStorage.setItem("interest_badge_user", JSON.stringify(user));
}

export async function fetchWithAuth(path: string, options: any = {}) {
  const token = getToken();
  return fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
}

export async function getCategories() {
  const res = await fetch(`${API_URL}/categories`);
  return res.json();
}

export async function getMe() {
  const res = await fetchWithAuth("/auth/me");
  if (!res.ok) return null;
  return res.json();
}

export async function updateInterests(categoryIds: string[]) {
  const user = getUser();
  const res = await fetchWithAuth("/users/me/interests", {
    method: "PUT",
    body: JSON.stringify({ categoryIds, userId: user.id }),
  });
  return res.json();
}
