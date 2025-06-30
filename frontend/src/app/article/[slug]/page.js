"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import dynamic from "next/dynamic";
import CommentForm from "@/components/CommentForm";
import CommentList from "@/components/CommentList";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Head from "next/head";

const DebugUser = dynamic(() => import("@/components/DebugUser"), {
  ssr: false,
});

export default function ArticlePage() {
  const { slug } = useParams();
  const router = useRouter();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [readingTime, setReadingTime] = useState(0);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const calculateReadingTime = (content) => {
    const text = content.replace(/<[^>]*>/g, "");
    const wordCount = text.split(/\s+/).length;
    return Math.ceil(wordCount / 200);
  };

  const fetchArticle = async () => {
    try {
      setError(null);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/articles/${slug}`
      );
      setArticle(res.data);
      setReadingTime(calculateReadingTime(res.data.content));
    } catch (err) {
      console.error("Error fetching article:", err);
      setError("Failed to load article. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="max-w-4xl mx-auto px-6 py-16">
          {/* Header Skeleton */}
          <div className="text-center mb-12">
            <div className="inline-block w-12 h-12 bg-gray-200 rounded-full animate-pulse mb-6"></div>
            <div className="h-8 bg-gray-200 rounded-lg animate-pulse mb-4 max-w-2xl mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 max-w-lg mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse max-w-md mx-auto"></div>
          </div>

          {/* Content Skeleton */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 p-8">
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center px-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Article Not Found
          </h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">{error}</p>
          <div className="space-x-4">
            <button
              onClick={() => router.push("/")}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-purple-200 transition-all duration-200"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Back to Home
            </button>
            <button
              onClick={fetchArticle}
              className="inline-flex items-center px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all duration-200"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center px-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
            <svg
              className="w-8 h-8 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Article Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-purple-200 transition-all duration-200"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center text-gray-600 hover:text-purple-600 transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Articles
          </button>

          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {readingTime} min read
            </div>
          </div>
        </div>
      </nav>

      <Head>
        <title>{article.title}</title>
        <meta name="description" content={article.metaDesc} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.metaDesc} />
        <meta property="og:type" content="article" />
      </Head>

      <main className="max-w-4xl mx-auto px-6 pb-16">
        <article className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
          <div className="prose prose-lg prose-purple max-w-none p-8 md:p-12">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {article.content}
            </ReactMarkdown>
          </div>
        </article>

        <CommentForm
          slug={slug}
          onCommentPosted={() => setRefreshTrigger((v) => v + 1)}
        />
        <CommentList slug={slug} refreshTrigger={refreshTrigger} />

        <div className="text-center mt-12">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-full hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-purple-200 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
            Back to Top
          </button>
        </div>
        <DebugUser />
      </main>
    </div>
  );
}
