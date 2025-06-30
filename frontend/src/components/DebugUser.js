"use client";
import { useSession } from "next-auth/react";

export default function DebugUser() {
  const { data: session } = useSession();

  return (
    <pre className="text-sm p-4 bg-gray-100 rounded">
      {JSON.stringify(session, null, 2)}
    </pre>
  );
}
