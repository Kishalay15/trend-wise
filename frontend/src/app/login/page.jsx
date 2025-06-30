"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl text-black font-bold text-center mb-6">
          Login to TrendWise
        </h2>
        <button
          onClick={() => signIn("google")}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
