'use client';

import { useState } from "react";
import { registerUser } from '@/app/utils/api';

export default function RegisterForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const { name, email, password } = form;
      const response = await registerUser({ name, email, password });
      alert("Revisa tu correo para activar la cuenta.");
    } catch (err: any) {
      alert(err.message || "Error en el registro");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-4"
    >
      <h2 className="text-2xl font-bold mb-2 text-center">Crear cuenta</h2>

      <input
        type="text"
        name="name"
        placeholder="Escribe tu nombre"
        className="w-full p-3 border border-gray-300 rounded-lg"
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Escribe tu correo"
        className="w-full p-3 border border-gray-300 rounded-lg"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Escribe tu contraseña"
        className="w-full p-3 border border-gray-300 rounded-lg"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Repite tu contraseña"
        className="w-full p-3 border border-gray-300 rounded-lg"
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-xl"
      >
        Crear cuenta
      </button>

      <p className="text-center text-sm">
        ¿Ya tienes cuenta?{" "}
        <a href="/login" className="text-indigo-600 font-medium">
          Inicia sesión
        </a>
      </p>
    </form>
  );
}
