import React from 'react';
import { CheckCircle } from 'lucide-react'; // Asegúrate de tener esta importación

interface ErrorAlertProps {
    message: string;
    successMessage?: string; // successMessage es ahora una prop opcional
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, successMessage }) => {
    return (
        <>
            {successMessage && (
                <div className="mb-4 px-4 py-3 bg-emerald-500 text-white font-semibold rounded-lg text-center shadow-md flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>{successMessage}</span>
                </div>
            )}
            {message && (
                <div className="bg-red-500 text-white font-bold rounded-md px-4 py-2 mt-2 shadow">
                    {message}
                </div>
            )}
        </>
    );
};

export default ErrorAlert;