"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LucideApple,
  Menu,
  X,
  ChevronDown,
  User,
  Bell,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
} from "lucide-react";

// Importar el nuevo custom hook
import { useNavbarLogic } from "./useNavbarLogic";
// Importar los componentes del botón de cerrar sesión
import { LogoutButton, ProfileLogoutButton } from "../LogoutButton";

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

interface NavbarProps {
  userName?: string;
  userEmail?: string;
  userDisplayName?: string;
  children?: React.ReactNode;
}

export default function Navbar({
  userName = "Usuario",
  userEmail = "",
  userDisplayName = "Usuario",
  children,
}: NavbarProps) {
  const {
    scrolled,
    mobileMenuOpen,
    setMobileMenuOpen,
    profileMenuOpen,
    setProfileMenuOpen,
    sidebarCollapsed,
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
  } = useNavbarLogic(userName, userEmail);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navbar principal - Fijo en la parte superior */}
      <header className="sticky top-0 z-50">
        <nav className="bg-white dark:bg-gray-800 shadow-md">
          <div className="flex items-center h-16">
            {/* Logo - Visible en ambas barras */}
            <div className="flex-shrink-0 flex items-center px-4">
              <Link 
                href="/dashboard" 
                className="flex items-center group p-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="h-10 w-10 bg-gradient-to-br from-green-400 to-emerald-600 dark:from-green-500 dark:to-emerald-700 rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
                  <LucideApple className="h-6 w-6 text-white" />
                </div>
                <span className="ml-3 text-xl font-bold text-emerald-800 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                  NutriTec
                </span>
              </Link>
            </div>

            {/* Mensaje de bienvenida - Centro */}
            <div className="hidden md:flex items-center justify-center flex-1">
              <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Bienvenido, <span className="font-semibold text-emerald-700 dark:text-emerald-400">{userName}</span>
              </h2>
            </div>

            {/* Sección de perfil y notificaciones */}
            <div className="flex items-center space-x-3 px-4 ml-auto">
              {/* Notificaciones */}
              <button
                type="button"
                className="relative p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-gray-700 focus:outline-none transition-colors"
              >
                <span className="sr-only">Ver notificaciones</span>
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400 ring-1 ring-white dark:ring-gray-800"></span>
              </button>

              {/* Perfil - Desktop */}
              <div className="hidden md:block relative" data-profile-menu>
                <button
                  type="button"
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg transition-colors"
                >
                  <div className="flex-shrink-0">
                    <div className="h-9 w-9 rounded-full bg-teal-500 dark:bg-teal-600 flex items-center justify-center text-white text-sm font-medium shadow-sm">
                      {getUserInitials()}
                    </div>
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-medium line-clamp-1">{userName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                      {userEmail || "usuario@nutritec.com"}
                    </p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                </button>

                {/* Menú desplegable de perfil */}
                <AnimatePresence>
                  {profileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 dark:ring-gray-700 py-1 z-50"
                    >
                      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{userName}</p>
                        {userEmail && <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{userEmail}</p>}
                      </div>
                      <Link
                        href="/dashboard/perfil"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-700 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                      >
                        <User className="mr-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
                        Tu Perfil
                      </Link>
                      <div className="border-t border-gray-100 dark:border-gray-700 mt-1"></div>
                      <ProfileLogoutButton 
                        onLogout={handleLogout}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Botón de menú móvil */}
              <div className="md:hidden">
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500 transition-colors"
                >
                  <span className="sr-only">{mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}</span>
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Contenedor principal con sidebar y contenido */}
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar - Solo visible en desktop */}
        <aside
          className={`hidden md:block ${
            sidebarCollapsed ? "w-16" : "w-64"
          } bg-white dark:bg-gray-800 shadow-md h-full transition-all duration-300 ease-in-out relative`}
        >
          {/* Botón para expandir/contraer - Centrado en el borde derecho */}
          <button
            onClick={toggleSidebar}
            className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white dark:bg-gray-700 rounded-full shadow-md flex items-center justify-center focus:outline-none hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors z-10 border border-gray-200 dark:border-gray-600"
            aria-label={sidebarCollapsed ? "Expandir menú" : "Contraer menú"}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-5 w-5 text-emerald-600 dark:text-emerald-400 font-bold" strokeWidth={2.5} />
            ) : (
              <ChevronLeft className="h-5 w-5 text-emerald-600 dark:text-emerald-400 font-bold" strokeWidth={2.5} />
            )}
          </button>

          <div className="flex flex-col h-full">
            {/* Enlaces de navegación en sidebar */}
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
              {navItems.map((item) => (
                <div key={item.name} className="relative">
                  {/* Elemento principal */}
                  {item.subItems ? (
                    <button
                      onClick={() => toggleExpanded(item.name)}
                      className={`flex items-center w-full px-3 py-3 rounded-lg text-sm font-semibold relative overflow-hidden ${
                        isGroupActive(item)
                          ? "text-emerald-600 dark:text-emerald-400 bg-gradient-to-r from-emerald-50 dark:from-emerald-900/30 to-transparent"
                          : "text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                      } transition-all duration-200 ${sidebarCollapsed ? "justify-center" : ""}`}
                    >
                      {isGroupActive(item) && (
                        <motion.div
                          layoutId={`sidebar-indicator-${item.name}`}
                          className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 dark:bg-emerald-400 rounded-r-full"
                          transition={{ duration: 0.3 }}
                        />
                      )}
                      <item.icon
                        className={`h-5 w-5 ${
                          isGroupActive(item)
                            ? "text-emerald-500 dark:text-emerald-400"
                            : "text-gray-400 dark:text-gray-500 group-hover:text-emerald-500 dark:group-hover:text-emerald-400"
                        }`}
                      />
                      {!sidebarCollapsed && (
                        <>
                          <span className="ml-3 flex-1 text-left">{item.name}</span>
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-200 ${
                              expandedItems[item.name] ? "transform rotate-180" : ""
                            }`}
                          />
                        </>
                      )}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`flex items-center px-3 py-3 rounded-lg text-sm font-semibold relative overflow-hidden ${
                        isActive(item.href)
                          ? "text-emerald-600 dark:text-emerald-400 bg-gradient-to-r from-emerald-50 dark:from-emerald-900/30 to-transparent"
                          : "text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                      } transition-all duration-200 ${sidebarCollapsed ? "justify-center" : ""}`}
                    >
                      {isActive(item.href) && (
                        <motion.div
                          layoutId={`sidebar-indicator-${item.name}`}
                          className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 dark:bg-emerald-400 rounded-r-full"
                          transition={{ duration: 0.3 }}
                        />
                      )}
                      <item.icon
                        className={`h-5 w-5 ${
                          isActive(item.href)
                            ? "text-emerald-500 dark:text-emerald-400"
                            : "text-gray-400 dark:text-gray-500 group-hover:text-emerald-500 dark:group-hover:text-emerald-400"
                        }`}
                      />
                      {!sidebarCollapsed && <span className="ml-3">{item.name}</span>}
                    </Link>
                  )}

                  {/* Subelementos con barra lateral gris */}
                  {!sidebarCollapsed && item.subItems && (
                    <AnimatePresence initial={false}>
                      {expandedItems[item.name] && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-5 pl-4 mt-1 space-y-1 border-l-2 border-gray-200 dark:border-gray-700"
                        >
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className={`flex items-center px-3 py-2 rounded-lg text-sm ${
                                isActive(subItem.href)
                                  ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 font-medium"
                                  : "text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                              } transition-colors`}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            {/* Sección inferior del sidebar */}
            <div className="p-3 border-t border-gray-100 dark:border-gray-700 space-y-2">
              {/* Botón de modo oscuro */}
              <div className={`flex items-center ${sidebarCollapsed ? "justify-center" : "px-3 py-2"}`}>
                <div className="relative">
                  <button
                    onClick={toggleDarkMode}
                    className={`w-14 h-7 flex items-center rounded-full p-1 transition-colors duration-300 focus:outline-none ${
                      darkMode ? "bg-gray-700" : "bg-gray-300"
                    }`}
                    aria-label={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
                  >
                    {/* Fondo con gradiente */}
                    <div
                      className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
                        darkMode
                          ? "bg-gradient-to-r from-gray-800 to-gray-900 opacity-100"
                          : "bg-gradient-to-r from-amber-100 to-amber-200 opacity-100"
                      }`}
                    ></div>

                    {/* Círculo deslizante */}
                    <motion.div
                      className={`w-5 h-5 rounded-full shadow-md z-10 flex items-center justify-center ${
                        darkMode ? "bg-gray-100" : "bg-white"
                      }`}
                      animate={{ x: darkMode ? 28 : 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      <AnimatePresence initial={false} mode="wait">
                        <motion.div
                          key={darkMode ? "moon" : "sun"}
                          initial={{ opacity: 0, rotate: -30 }}
                          animate={{ opacity: 1, rotate: 0 }}
                          exit={{ opacity: 0, rotate: 30 }}
                          transition={{ duration: 0.2 }}
                        >
                          {darkMode ? (
                            <Moon className="h-3 w-3 text-gray-800" />
                          ) : (
                            <Sun className="h-3 w-3 text-amber-500" />
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </motion.div>

                    {/* Iconos decorativos */}
                    <div className="absolute inset-0 flex items-center justify-between px-1 pointer-events-none">
                      <span
                        className={`text-xs transition-opacity duration-300 ${
                          darkMode ? "opacity-0" : "opacity-100 text-amber-600"
                        }`}
                      >
                        <Sun className="h-3 w-3" />
                      </span>
                      <span
                        className={`text-xs transition-opacity duration-300 ${
                          darkMode ? "opacity-100 text-gray-300" : "opacity-0"
                        }`}
                      >
                        <Moon className="h-3 w-3" />
                      </span>
                    </div>
                  </button>
                </div>
                {!sidebarCollapsed && (
                  <span className="ml-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                    {darkMode ? "Modo oscuro" : "Modo claro"}
                  </span>
                )}
              </div>

              <LogoutButton 
                sidebarCollapsed={sidebarCollapsed} 
                onLogout={handleLogout}
              />
            </div>
          </div>
        </aside>

        {/* Menú móvil - Visible solo cuando está abierto */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 md:hidden"
              style={{ top: "4rem" }}
            >
              {/* Overlay oscuro */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black dark:bg-black"
                style={{ top: "4rem" }}
                onClick={() => setMobileMenuOpen(false)}
              ></motion.div>

              {/* Panel de navegación */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative flex flex-col w-full max-w-[calc(100%-2rem)] h-[calc(100vh-7rem)] mx-auto my-4 bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden"
              >
                {/* Perfil en móvil */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-teal-500 dark:bg-teal-600 flex items-center justify-center text-white text-lg font-medium shadow-sm">
                      {getUserInitials()}
                    </div>
                    <div className="ml-3">
                      <p className="text-base font-medium text-gray-800 dark:text-gray-200">{userName}</p>
                      {userEmail && <p className="text-sm text-gray-500 dark:text-gray-400">{userEmail}</p>}
                    </div>
                  </div>
                </div>

                {/* Enlaces de navegación en móvil */}
                <div className="flex-1 overflow-y-auto p-3 space-y-1">
                  {navItems.map((item) => (
                    <div key={item.name} className="relative">
                      {/* Elemento principal */}
                      {item.subItems ? (
                        <button
                          onClick={() => toggleExpanded(item.name)}
                          className={`flex items-center w-full px-4 py-3 rounded-lg text-base font-semibold relative overflow-hidden ${
                            isGroupActive(item)
                              ? "text-emerald-600 dark:text-emerald-400 bg-gradient-to-r from-emerald-50 dark:from-emerald-900/30 to-transparent"
                              : "text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                          } transition-all duration-200`}
                        >
                          {isGroupActive(item) && (
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 dark:bg-emerald-400 rounded-r-full" />
                          )}
                          <item.icon
                            className={`mr-3 h-6 w-6 ${
                              isGroupActive(item)
                                ? "text-emerald-500 dark:text-emerald-400"
                                : "text-gray-400 dark:text-gray-500"
                            }`}
                          />
                          <span className="flex-1 text-left">{item.name}</span>
                          <ChevronDown
                            className={`h-5 w-5 transition-transform duration-200 ${
                              expandedItems[item.name] ? "transform rotate-180" : ""
                            }`}
                          />
                        </button>
                      ) : (
                        <Link
                          href={item.href}
                          className={`flex items-center px-4 py-3 rounded-lg text-base font-semibold relative overflow-hidden ${
                            isActive(item.href)
                              ? "text-emerald-600 dark:text-emerald-400 bg-gradient-to-r from-emerald-50 dark:from-emerald-900/30 to-transparent"
                              : "text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                          } transition-all duration-200`}
                        >
                          {isActive(item.href) && (
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 dark:bg-emerald-400 rounded-r-full" />
                          )}
                          <item.icon
                            className={`mr-3 h-6 w-6 ${
                              isActive(item.href)
                                ? "text-emerald-500 dark:text-emerald-400"
                                : "text-gray-400 dark:text-gray-500"
                            }`}
                          />
                          {item.name}
                        </Link>
                      )}

                      {/* Subelementos con barra lateral gris */}
                      <AnimatePresence initial={false}>
                        {item.subItems && expandedItems[item.name] && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-6 pl-4 mt-1 space-y-1 border-l-2 border-gray-200 dark:border-gray-700"
                          >
                            {item.subItems.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className={`flex items-center px-4 py-2 rounded-lg text-sm ${
                                  isActive(subItem.href)
                                    ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 font-medium"
                                    : "text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                                } transition-colors`}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                {/* Pie del menú móvil */}
                <div className="p-3 border-t border-gray-200 dark:border-gray-700 space-y-2">
                  {/* Botón de modo oscuro en móvil */}
                  <div className="flex items-center px-4 py-2">
                    <div className="relative">
                      <button
                        onClick={toggleDarkMode}
                        className={`w-14 h-7 flex items-center rounded-full p-1 transition-colors duration-300 focus:outline-none ${
                          darkMode ? "bg-gray-700" : "bg-gray-300"
                        }`}
                        aria-label={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
                      >
                        {/* Fondo con gradiente */}
                        <div
                          className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
                            darkMode
                              ? "bg-gradient-to-r from-gray-800 to-gray-900 opacity-100"
                              : "bg-gradient-to-r from-amber-100 to-amber-200 opacity-100"
                          }`}
                        ></div>

                        {/* Círculo deslizante */}
                        <motion.div
                          className={`w-5 h-5 rounded-full shadow-md z-10 flex items-center justify-center ${
                            darkMode ? "bg-gray-100" : "bg-white"
                          }`}
                          animate={{ x: darkMode ? 28 : 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        >
                          <AnimatePresence initial={false} mode="wait">
                            <motion.div
                              key={darkMode ? "moon" : "sun"}
                              initial={{ opacity: 0, rotate: -30 }}
                              animate={{ opacity: 1, rotate: 0 }}
                              exit={{ opacity: 0, rotate: 30 }}
                              transition={{ duration: 0.2 }}
                            >
                              {darkMode ? (
                                <Moon className="h-3 w-3 text-gray-800" />
                              ) : (
                                <Sun className="h-3 w-3 text-amber-500" />
                              )}
                            </motion.div>
                          </AnimatePresence>
                        </motion.div>

                        {/* Iconos decorativos */}
                        <div className="absolute inset-0 flex items-center justify-between px-1 pointer-events-none">
                          <span
                            className={`text-xs transition-opacity duration-300 ${
                              darkMode ? "opacity-0" : "opacity-100 text-amber-600"
                            }`}
                          >
                            <Sun className="h-3 w-3" />
                          </span>
                          <span
                            className={`text-xs transition-opacity duration-300 ${
                              darkMode ? "opacity-100 text-gray-300" : "opacity-0"
                            }`}
                          >
                            <Moon className="h-3 w-3" />
                          </span>
                        </div>
                      </button>
                    </div>
                    <span className="ml-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                      {darkMode ? "Modo oscuro" : "Modo claro"}
                    </span>
                  </div>

                  <LogoutButton isMobileMenu={true} 
                    onLogout={handleLogout}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contenido principal */}
        <main ref={mainContentRef} className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}