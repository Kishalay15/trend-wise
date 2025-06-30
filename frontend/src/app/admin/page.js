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

  if (status === "loading") return <p className="p-6">Loading...</p>;
  // if (session?.user?.email !== "lahirikishalay@gmail.com")
  //   return <p>Access Denied</p>;

  if (!ADMIN_EMAILS.includes(session?.user?.email)) {
    return <p>Access Denied</p>;
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-8 text-black">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <button
        onClick={generateArticle}
        disabled={loading}
        className="px-6 py-3 bg-purple-600 text-white font-medium rounded hover:bg-purple-700 transition disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate Article"}
      </button>
    </div>
  );
}
