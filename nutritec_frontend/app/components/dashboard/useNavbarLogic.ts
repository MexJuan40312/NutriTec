import { useState, useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import React from "react"; 
import { useAuth } from "@/app/auth/authContext";

// Iconos importados desde lucide-react
import {
  Home,
  Calendar,
  BookOpen,
  Activity,
  CalendarDays,
  ListTodo,
  Info,
  Users,
  Heart,
} from "lucide-react"; 


// Definición de tipos para los elementos del menú de navegación
interface SubNavItem {
  name: string;
  href: string;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  subItems?: SubNavItem[];
}

export const useNavbarLogic = (userNameProp: string = "Usuario", userEmailProp: string = "") => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [darkMode, setDarkMode] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const { setToken, setUser } = useAuth();

  // Lista de enlaces de navegación con subsecciones
  const navItems: NavItem[] = [
    { name: "Inicio", href: "/dashboard", icon: Home },
    {
      name: "Plan nutricional",
      href: "#",
      icon: Calendar,
      subItems: [
        { name: "Genera un plan", href: "/dashboard/plan/generar" },
        { name: "Planes generados", href: "/dashboard/plan/generados" },
        { name: "Planes Favoritos", href: "/dashboard/plan/favoritos" },
      ],
    },
    { name: "Consejos", href: "/dashboard/views/tips", icon: BookOpen },
    {
      name: "Ejercicio",
      href: "#",
      icon: Activity,
      subItems: [
        { name: "Genera un plan", href: "/dashboard/views/excersice/saved" },
        { name: "Planes generados", href: "/dashboard/views/excersice/generated" },
        { name: "Planes Favoritos", href: "/dashboard/views/excersice/favorite" },
      ],
    },
    { name: "Calendario", href: "/dashboard/views/calendar", icon: CalendarDays },
    { name: "Planes", href: "/dashboard/views/plans", icon: ListTodo },
    { name: "Conoce NutriTec", href: "/dashboard/views/know-nutritec", icon: Info },
    { name: "Equipo de desarrollo", href: "/dashboard/views/teamwork", icon: Users },
    { name: "Donaciones", href: "/dashboard/views/donations", icon: Heart },
  ];

  // Detectar scroll para cambiar la apariencia del navbar
  useEffect(() => {
    const handleScroll = () => {
      if (mainContentRef.current) {
        setScrolled(mainContentRef.current.scrollTop > 10);
      }
    };

    const currentMainContent = mainContentRef.current;
    if (currentMainContent) {
      currentMainContent.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (currentMainContent) {
        currentMainContent.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  // Cerrar menús al cambiar de ruta
  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileMenuOpen(false);
  }, [pathname]);

  // Evitar scroll cuando el menú móvil está abierto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Cerrar menú de perfil al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (profileMenuOpen && !target.closest("[data-profile-menu]")) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileMenuOpen]);

  // Obtener iniciales del nombre de usuario
  const getUserInitials = useCallback(() => {
    if (!userNameProp) return "U";
    return userNameProp
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  }, [userNameProp]);

  // Verificar si un enlace está activo
  const isActive = useCallback(
    (href: string) => {
      if (href === "#") return false;
      if (href === "/dashboard") {
        return pathname === href;
      }
      return pathname.startsWith(href);
    },
    [pathname],
  );

  // Verificar si un grupo de enlaces tiene alguno activo
  const isGroupActive = useCallback(
    (item: NavItem) => {
      if (item.subItems) {
        return item.subItems.some((subItem) => isActive(subItem.href));
      }
      return false;
    },
    [isActive],
  );

  // Toggle para el sidebar
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Toggle para expandir/contraer subsecciones
  const toggleExpanded = (name: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  // Toggle para el modo oscuro
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);

    // Aplicar clase dark al elemento html
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Efecto para aplicar el modo oscuro al cargar
  useEffect(() => {
    // Verificar si hay preferencia guardada
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);

    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Guardar preferencia de modo oscuro
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

    // Función para manejar el logout
  const handleLogout = () => {
    try {
      // Limpiar el estado de autenticación
      setToken(null);
      setUser(null);
      
      // Opcional: resetear estados relevantes del navbar
      setMobileMenuOpen(false);
      setProfileMenuOpen(false);
      
      // Redirigir a la página de login
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return {
    scrolled,
    mobileMenuOpen,
    setMobileMenuOpen,
    profileMenuOpen,
    setProfileMenuOpen,
    sidebarCollapsed,
    setSidebarCollapsed,
    expandedItems,
    darkMode,
    toggleDarkMode,
    mainContentRef,
    getUserInitials,
    isActive,
    isGroupActive,
    toggleExpanded,
    toggleSidebar,
    navItems,
    handleLogout
  };
};