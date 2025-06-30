"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CommentList({ slug, refreshTrigger }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchComments = async () => {
    try {
      setError(null);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/comments?slug=${slug}`
      );
      setComments(res.data);
    } catch (err) {
      console.error("Error loading comments", err);
      setError("Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchComments();
    }
  }, [slug, refreshTrigger]);

  const getInitials = (email) => {
    return email.split("@")[0].charAt(0).toUpperCase();
  };

  const getDisplayName = (email) => {
    return email.split("@")[0];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - date) / (1000 * 60));
      return diffInMinutes <= 1 ? "Just now" : `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return diffInDays === 1 ? "1 day ago" : `${diffInDays} days ago`;
    }
  };

  if (loading) {
    return (
      <div className="mt-8 space-y-4">
        <div className="text-sm text-gray-500">Loading comments...</div>
        {[1, 2].map((i) => (
          <div key={i} className="border rounded p-4 animate-pulse">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div className="flex-grow space-y-2">
                <div className="h-3 bg-gray-200 rounded w-20"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 text-center py-6">
        <p className="text-gray-600 mb-3">{error}</p>
        <button
          onClick={fetchComments}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!comments.length) {
    return (
      <div className="mt-8 text-center py-8">
        <p className="text-gray-500">No comments yet.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Comments</h3>
        <span className="text-sm text-gray-500">
          {comments.length} {comments.length === 1 ? "comment" : "comments"}
        </span>
      </div>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment._id} className="border rounded p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                  {getInitials(comment.userEmail)}
                </div>
              </div>

              <div className="flex-grow min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="text-sm font-medium text-gray-900">
                    {getDisplayName(comment.userEmail)}
                  </h4>
                  <span className="text-gray-400">•</span>
                  <time className="text-xs text-gray-500">
                    {/* {comment.createdAt
                      ? formatDate(comment.createdAt)
                      : "Recently"} */}
                    {comment.timestamp
                      ? formatDate(comment.timestamp)
                      : "Recently"}
                  </time>
                </div>

                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                  {comment.commentText}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
