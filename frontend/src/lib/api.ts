// Centralized API utility for Trend Whisper frontend
// Handles client-side/server-side distinction, JWT, and error normalization

export interface ApiOptions {
  method?: string;
  body?: any;
  token?: string;
  isForm?: boolean;
}

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function apiFetch<T>(
  endpoint: string,
  opts: ApiOptions = {}
): Promise<T> {
  const headers: Record<string, string> = {};
  let body = opts.body;
  if (opts.token) headers['Authorization'] = `Bearer ${opts.token}`;
  if (!opts.isForm && body && typeof body === 'object') {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(body);
  }
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: opts.method || (body ? 'POST' : 'GET'),
    headers,
    body: opts.isForm ? body : body || undefined,
    credentials: 'include',
  });
  let data;
  try {
    data = await res.json();
  } catch {
    data = {};
  }
  if (!res.ok) {
    throw data.error || 'API error';
  }
  return data;
}

// Helper: get JWT from localStorage/session (client only)
export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('jwt') || null;
}

// Helper: set JWT (client only)
export function setToken(token: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('jwt', token);
}

// Helper: remove JWT (client only)
export function removeToken() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('jwt');
}
