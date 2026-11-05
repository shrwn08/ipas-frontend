const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:3000/api"
).replace(/\/+$/, "");

export const readToken = () => {
  try {
    return localStorage.getItem("token");
  } catch {
    return null;
  }
};

export const apiCall = async (
  path,
  { method = "POST", body, auth = false } = {},
) => {
  try {
    const headers = {};
    if (body) headers["Content-Type"] = "application/json";

    if (auth) {
      const token = readToken();
      if (token) headers.Authorization = `Bearer ${token}`;
    }

    const endpoint = path.replace(/^\/+/, "");
    const res = await fetch(`${API_URL}/${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        message:
          data.message ||
          (res.status === 429
            ? "Too many attemps. Wait a few minutes and try again."
            : "Something went wrong. Try again"),
      };
    }

    return { ok: true, status: res.status, data };
  } catch {
    return {
      ok: false,
      status: 0,
      message: "Can't reach the server. Check your connection and try again.",
    };
  }
};
