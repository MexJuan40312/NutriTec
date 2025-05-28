// Crea un nuevo hook useUserData.ts
import { useAuth } from "@/app/auth/authContext";

export const useUserData = (defaultName = "Usuario") => {
  const { user } = useAuth();
  
  return {
    userName: user?.name || user?.email?.split("@")[0] || defaultName,
    userEmail: user?.email || ""
  };
};