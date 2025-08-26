type Query = Record<string, string | number | boolean | undefined | null>;

function withQuery(url: string, query?: Query) {
  if (!query) return url;
  const params = new URLSearchParams();
  Object.entries(query).forEach(([k, v]) => {
    if (v !== undefined && v !== null) params.set(k, String(v));
  });
  return `${url}?${params.toString()}`;
}

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed with ${res.status}`);
  }
  return res.json();
}

export async function getApi<T>(url: string, query?: Query): Promise<T> {
  const res = await fetch(withQuery(url, query), { cache: "no-store" });
  return handle<T>(res);
}

export async function postApi<T>(url: string, body?: unknown): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body ?? {}),
  });
  return handle<T>(res);
}

export async function putApi<T>(url: string, body?: unknown): Promise<T> {
  const res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body ?? {}),
  });
  return handle<T>(res);
}

export async function deleteApi<T>(url: string, query?: Query): Promise<T> {
  const res = await fetch(withQuery(url, query), { method: "DELETE" });
  return handle<T>(res);
}
