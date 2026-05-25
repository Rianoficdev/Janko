"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Role = "admin" | "user";

export type User = {
  name: string;
  email: string;
  role: Role;
};

type AuthState = {
  user: User | null;
  role: Role | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { ok: boolean; message: string; user?: User };
  register: (name: string, email: string, password: string) => { ok: boolean; message: string; user?: User };
  logout: () => void;
};

const ADMIN_EMAIL = "admin@janko.com";
const ADMIN_PASSWORD = "123456";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      role: null,
      isAuthenticated: false,
      login: (email, password) => {
        if (email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
          const user: User = {
            name: "Admin JANKO",
            email: ADMIN_EMAIL,
            role: "admin",
          };

          set({ user, role: user.role, isAuthenticated: true });
          return { ok: true, message: "Admin autenticado.", user };
        }

        if (email.includes("@") && password.length >= 6) {
          const user: User = {
            name: email.split("@")[0] || "Cliente JANKO",
            email,
            role: "user",
          };

          set({ user, role: user.role, isAuthenticated: true });
          return { ok: true, message: "Usuario autenticado como cliente.", user };
        }

        return { ok: false, message: "E-mail ou senha invalidos." };
      },
      register: (name, email, password) => {
        if (!name.trim() || !email.includes("@") || password.length < 6) {
          return { ok: false, message: "Preencha nome, e-mail e senha com pelo menos 6 caracteres." };
        }

        const user: User = {
          name,
          email,
          role: "user",
        };

        set({ user, role: user.role, isAuthenticated: true });
        return { ok: true, message: "Cadastro mockado criado.", user };
      },
      logout: () => set({ user: null, role: null, isAuthenticated: false }),
    }),
    {
      name: "janko-auth",
      partialize: (state) => ({
        user: state.user,
        role: state.role,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
