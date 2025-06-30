"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const ADMIN_EMAILS = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(",") || [];

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status]);

  useEffect(() => {
    if (
      status === "authenticated" &&
      !ADMIN_EMAILS.includes(session?.user?.email)
    ) {
      toast.error("You are not authorized to access this page");
    }
  }, [status, session]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!ADMIN_EMAILS.includes(session?.user?.email)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Access denied</p>
      </div>
    );
  }

  const generateArticle = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/admin/generate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-user-email": session.user.email,
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        toast.success(`Article created: ${data.slug}`);
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch (err) {
      toast.error("Failed to trigger article generation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-8">
            Admin Dashboard
          </h1>

          <button
            onClick={generateArticle}
            disabled={loading}
            className="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Generating...
              </>
            ) : (
              "Generate Article"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
