import React from "react";
import { LogOut } from "lucide-react";

interface LogoutButtonProps {
  sidebarCollapsed?: boolean;
  isMobileMenu?: boolean;
  onLogout?: () => void;
}

export const LogoutButton = ({ 
  sidebarCollapsed, 
  isMobileMenu, 
  onLogout 
}: LogoutButtonProps) => {
  const commonClasses = "flex w-full items-center rounded-lg text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors";

  if (isMobileMenu) {
    return (
      <button 
        onClick={onLogout}
        className={`${commonClasses} px-4 py-3 text-base font-semibold`}
      >
        <LogOut className="mr-3 h-6 w-6 text-red-500 dark:text-red-400" />
        Cerrar sesión
      </button>
    );
  }

  return (
    <button
      onClick={onLogout}
      className={`${commonClasses} px-3 py-3 text-sm font-semibold ${
        sidebarCollapsed ? "justify-center" : ""
      }`}
    >
      <LogOut className="h-5 w-5 text-red-500 dark:text-red-400" aria-hidden="true" />
      {!sidebarCollapsed && <span className="ml-3">Cerrar sesión</span>}
    </button>
  );
};

interface ProfileLogoutButtonProps {
  onLogout?: () => void;
}

export const ProfileLogoutButton = ({ onLogout }: ProfileLogoutButtonProps) => {
  return (
    <button 
      onClick={onLogout}
      className="flex w-full items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700 transition-colors"
    >
      <LogOut className="mr-3 h-4 w-4 text-red-500 dark:text-red-400" />
      Cerrar Sesión
    </button>
  );
};