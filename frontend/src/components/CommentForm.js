"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function CommentForm({ slug, onCommentPosted }) {
  const { data: session } = useSession();
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  if (!session) {
    return (
      <div className="mt-8 border rounded p-6 text-center">
        <p className="text-gray-600 mb-3">Sign in to leave a comment</p>
        <button className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800">
          Sign In
        </button>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      setSubmitting(true);
      setError(null);

      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/comments`,
        {
          articleSlug: slug,
          userEmail: session.user.email,
          commentText: text.trim(),
        }
      );

      setText("");
      setShowForm(false);
      onCommentPosted();
    } catch (err) {
      console.error("Error posting comment", err);
      setError("Failed to post comment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const getInitials = (email) => {
    return email.split("@")[0].charAt(0).toUpperCase();
  };

  if (!showForm) {
    return (
      <div className="mt-8">
        <div className="border rounded p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                {getInitials(session.user.email)}
              </div>
            </div>
            <div className="flex-grow">
              <button
                onClick={() => setShowForm(true)}
                className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded border text-gray-500 hover:text-gray-700"
              >
                Write a comment...
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="border rounded p-4">
        <div className="flex items-start space-x-3 mb-4">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
              {getInitials(session.user.email)}
            </div>
          </div>
          <div className="flex-grow">
            <p className="text-sm font-medium text-gray-900">
              {session.user.name || session.user.email.split("@")[0]}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your comment..."
            className="w-full p-3 border rounded resize-none focus:outline-none focus:ring-1 focus:ring-gray-400 text-black"
            rows={3}
            maxLength={1000}
          />

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setText("");
                setError(null);
              }}
              className="text-gray-600 hover:text-gray-800 text-sm"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting || !text.trim()}
              className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {submitting ? "Posting..." : "Post Comment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
