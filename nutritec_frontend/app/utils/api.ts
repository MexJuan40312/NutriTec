// api.ts
export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  const res = await fetch(`${API_URL}/api/auth/register`, { // Modificado: añadido /api
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.error || "Error al registrar usuario");
  }
  return result;
}

export async function loginUser(data: { email: string; password: string }) {
  const res = await fetch(`${API_URL}/api/auth/login`, { // Modificado: añadido /api
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) {
    // Devolvemos el mensaje de error específico del backend si existe
    throw new Error(result.error || result.message || "Error al iniciar sesión");
  }
  return result;
}

export async function getProfile(token: string) {
  const res = await fetch(`${API_URL}/api/profile`, { // Modificado: añadido /api. Nota: Tu backend tiene '/profile' en el root de 'routes', pero lo accede vía '/api/profile'
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.error || "Error al obtener el perfil del usuario");
  }
  return result.profile; // Ajusta esto según la respuesta de tu backend
}

// Contenido generado por Deepseek (Modificado):
export async function requestPasswordReset(email: string) {
  const res = await fetch(`${API_URL}/api/auth/forgot-password`, { // Modificado: añadido /api
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.error || "Error al solicitar recuperación");
  }
  return result;
}

export async function resetPassword(data: { token: string; newPassword: string }) {
  const res = await fetch(`${API_URL}/api/auth/reset-password`, { // Modificado: añadido /api
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.error || "Error al actualizar la contraseña");
  }
  return result;
}