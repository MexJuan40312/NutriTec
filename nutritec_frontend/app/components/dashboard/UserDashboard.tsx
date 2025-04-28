"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/auth/authContext';
import { getProfile } from '@/app/utils/api';

const UserDashboard = () => {
  const { token, user } = useAuth(); // 🔥 Ya no usaremos setUser aquí
  const [profileData, setProfileData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (token) {
        setLoading(true);
        setError(null);
        try {
          const data = await getProfile(token);
          setProfileData(data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]); 

  if (loading) {
    return <p className="text-gray-500 text-lg animate-pulse">Cargando datos del usuario...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-lg">Error al cargar los datos del usuario: {error}</p>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Bienvenido, {profileData?.name || user?.name || user?.email || 'Usuario'}
      </h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-700">
          Este es tu dashboard personalizado. Aquí podrás ver información relevante y acceder a las funcionalidades de NutriTec.
        </p>
        {profileData?.email && <p className="text-gray-700">Tu correo electrónico es: {profileData.email}</p>}
        {profileData?.name && <p className="text-gray-700">Tu nombre es: {profileData.name}</p>}
      </div>
    </div>
  );
};

export default UserDashboard;
