"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/app/auth/authContext";
import { getProfile } from "@/app/utils/api";
import {
  Calendar,
  BookOpen,
  Activity,
  Info,
  CalendarDays,
  ListTodo,
  Users,
  Heart,
  ChevronRight,
  Lightbulb,
  Utensils,
  Dumbbell,
  ClipboardList,
  Coffee,
  Leaf,
  Clock,
  Target,
  Award,
  Zap,
  Sparkles
} from "lucide-react";

interface SubSection {
  title: string;
  description: string;
  icon: any;
  emoji: string;
}

interface Section {
  title: string;
  description: string;
  icon: any;
  emoji: string;
  color: string;
  gradient: string;
  darkGradient: string;
  subSections: SubSection[];
}

export const useDashboardLogic = (userDisplayName = "Usuario") => {
  const { user, token } = useAuth();
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [typedText, setTypedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const typingRef = useRef<HTMLDivElement>(null);
  
  // Obtener datos del perfil
  useEffect(() => {
    const fetchProfile = async () => {
      if (token) {
        try {
          const data = await getProfile(token);
          setProfileData(data);
        } catch (error) {
          console.error("Error fetching profile:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  // Obtener el nombre para mostrar
  const displayName = profileData?.name || user?.name || user?.email?.split("@")[0] || userDisplayName;

  // Efecto para la animación de escritura
  useEffect(() => {
    if (loading) return;

    let currentIndex = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const fullText = `¡Hola ${displayName}! 👋 Bienvenido a NutriTec ✨ Es un placer tenerte aquí 😊 Recuerda que una alimentación saludable es el primer paso hacia el bienestar 🥗 Explora la aplicación según tus necesidades, revisa tus notas 📝 y sigue tus planes nutricionales para alcanzar tus objetivos 🎯 ¡Estamos aquí para apoyarte en tu camino hacia una vida más saludable! 💪`;

    const typeNextCharacter = () => {
      if (currentIndex < fullText.length) {
        setTypedText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
        timer = setTimeout(typeNextCharacter, 20);
      } else {
        setIsTypingComplete(true);
      }
    };

    timer = setTimeout(typeNextCharacter, 800);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [displayName, loading]);

  // Scroll automático mientras se escribe
  useEffect(() => {
    if (typingRef.current) {
      typingRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [typedText]);

  // Definición de secciones
  const sections: Section[] = [
    {
      title: "Plan Nutricional",
      description: "Crea y gestiona planes de alimentación personalizados según tus objetivos y preferencias dietéticas.",
      icon: Calendar,
      emoji: "🥗",
      color: "emerald",
      gradient: "from-emerald-400 to-green-500",
      darkGradient: "from-emerald-600 to-green-700",
      subSections: [
        {
          title: "Genera un Plan",
          description: "Crea un nuevo plan nutricional basado en tus necesidades específicas y objetivos de salud.",
          icon: Utensils,
          emoji: "🍽️",
        },
        {
          title: "Planes Generados",
          description: "Revisa y gestiona todos los planes nutricionales que has creado anteriormente.",
          icon: ClipboardList,
          emoji: "📋",
        },
        {
          title: "Planes Favoritos",
          description: "Accede rápidamente a tus planes nutricionales favoritos para seguirlos con facilidad.",
          icon: Heart,
          emoji: "❤️",
        },
      ],
    },
    {
      title: "Consejos Nutricionales",
      description: "Descubre consejos y recomendaciones nutricionales para mejorar tu alimentación y bienestar general.",
      icon: BookOpen,
      emoji: "📚",
      color: "blue",
      gradient: "from-blue-400 to-indigo-500",
      darkGradient: "from-blue-600 to-indigo-700",
      subSections: [
        {
          title: "Consejos Diarios",
          description: "Recibe consejos nutricionales diarios para mejorar tus hábitos alimenticios.",
          icon: Coffee,
          emoji: "☕",
        },
        {
          title: "Artículos Saludables",
          description: "Lee artículos sobre nutrición y bienestar escritos por expertos.",
          icon: Leaf,
          emoji: "🌿",
        },
      ],
    },
    {
      title: "Ejercicio y Actividad",
      description: "Encuentra rutinas de ejercicio adaptadas a tus necesidades y nivel de condición física actual.",
      icon: Activity,
      emoji: "🏋️",
      color: "amber",
      gradient: "from-amber-400 to-orange-500",
      darkGradient: "from-amber-600 to-orange-700",
      subSections: [
        {
          title: "Genera un Plan",
          description: "Crea una nueva rutina de ejercicios personalizada según tus objetivos y nivel.",
          icon: Dumbbell,
          emoji: "💪",
        },
        {
          title: "Planes Generados",
          description: "Revisa y gestiona todas las rutinas de ejercicio que has creado anteriormente.",
          icon: ClipboardList,
          emoji: "📋",
        },
        {
          title: "Planes Favoritos",
          description: "Accede rápidamente a tus rutinas de ejercicio favoritas para seguirlas con facilidad.",
          icon: Heart,
          emoji: "❤️",
        },
      ],
    },
    {
      title: "Calendario y Seguimiento",
      description: "Organiza tus comidas y ejercicios en un calendario para mantener un seguimiento efectivo de tu progreso.",
      icon: CalendarDays,
      emoji: "📅",
      color: "purple",
      gradient: "from-purple-400 to-fuchsia-500",
      darkGradient: "from-purple-600 to-fuchsia-700",
      subSections: [
        {
          title: "Vista Mensual",
          description: "Visualiza tus planes y actividades en formato de calendario mensual.",
          icon: Calendar,
          emoji: "📆",
        },
        {
          title: "Recordatorios",
          description: "Configura alertas para no olvidar tus comidas y ejercicios programados.",
          icon: Clock,
          emoji: "⏰",
        },
      ],
    },
    {
      title: "Gestión de Planes",
      description: "Administra todos tus planes de nutrición y ejercicio en un solo lugar para mayor comodidad y eficiencia.",
      icon: ListTodo,
      emoji: "📝",
      color: "indigo",
      gradient: "from-indigo-400 to-violet-500",
      darkGradient: "from-indigo-600 to-violet-700",
      subSections: [
        {
          title: "Organizar Planes",
          description: "Categoriza y organiza tus planes para un acceso más rápido.",
          icon: Target,
          emoji: "🎯",
        },
        {
          title: "Compartir Planes",
          description: "Comparte tus planes exitosos con amigos o la comunidad NutriTec.",
          icon: Users,
          emoji: "👥",
        },
      ],
    },
    {
      title: "Conoce NutriTec",
      description: "Aprende más sobre NutriTec, sus funcionalidades y cómo sacarle el máximo provecho a la plataforma.",
      icon: Info,
      emoji: "ℹ️",
      color: "teal",
      gradient: "from-teal-400 to-cyan-500",
      darkGradient: "from-teal-600 to-cyan-700",
      subSections: [
        {
          title: "Tutoriales",
          description: "Guías paso a paso para aprovechar todas las funciones de NutriTec.",
          icon: BookOpen,
          emoji: "📖",
        },
        {
          title: "Preguntas Frecuentes",
          description: "Respuestas a las dudas más comunes sobre la plataforma.",
          icon: Lightbulb,
          emoji: "💡",
        },
      ],
    },
    {
      title: "Equipo de Desarrollo",
      description: "Conoce al equipo detrás de NutriTec y su misión de promover hábitos saludables a través de la tecnología.",
      icon: Users,
      emoji: "👨‍💻",
      color: "pink",
      gradient: "from-pink-400 to-rose-500",
      darkGradient: "from-pink-600 to-rose-700",
      subSections: [
        {
          title: "Nuestro Equipo",
          description: "Conoce a las personas que hacen posible NutriTec.",
          icon: Award,
          emoji: "🏆",
        },
        {
          title: "Nuestra Misión",
          description: "Descubre nuestra visión para mejorar la salud global.",
          icon: Target,
          emoji: "🎯",
        },
      ],
    },
    {
      title: "Apoya a NutriTec",
      description: "Contribuye al desarrollo continuo de NutriTec para seguir mejorando la plataforma y sus funcionalidades.",
      icon: Heart,
      emoji: "❤️",
      color: "red",
      gradient: "from-red-400 to-rose-500",
      darkGradient: "from-red-600 to-rose-700",
      subSections: [
        {
          title: "Donaciones",
          description: "Apoya económicamente el desarrollo de NutriTec.",
          icon: Sparkles,
          emoji: "✨",
        },
        {
          title: "Comparte NutriTec",
          description: "Ayúdanos a crecer compartiendo la aplicación con tus amigos.",
          icon: Zap,
          emoji: "⚡",
        },
      ],
    },
  ];

  return {
    displayName,
    typedText,
    isTypingComplete,
    typingRef,
    sections,
    loading
  };
};