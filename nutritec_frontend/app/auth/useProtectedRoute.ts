// useProtectedRoute.ts
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./authContext";
import { getProfile } from "@/app/utils/api";

export function useProtectedRoute() {
  const { token, isLoading } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true); 
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);

  // Hook encargado de realizar ciertas acciones en base a la validación del Token
  useEffect(() => {
    const checkTokenValidity = async () => {
      if (!isLoading && token) {
        setIsChecking(true);
        try {
          await getProfile(token);
          setIsValidToken(true);
        } catch (error: any) {
          setIsValidToken(false);
          router.replace("/auth/login");
        } finally {
          setIsChecking(false);
        }
      } else if (!isLoading && !token) {
        setIsValidToken(false);
        router.replace("/auth/login");
        setIsChecking(false);
      } else if (isLoading) {
        setIsChecking(true); 
      }
    };

    checkTokenValidity();
  }, [token, isLoading, router]);

  return { isChecking, isValidToken };
}