// En app/auth/forgot-password/page.tsx
import ForgotPasswordForm from "@/app/components/forms/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4">
      <ForgotPasswordForm />
    </div>
  );
}