"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ArticleCard from "@/components/ArticleCard";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Head from "next/head";

export default function HomePage() {
  const [articles, setArticles] = useState(null);
  const [error, setError] = useState(null);
  const [isRetrying, setIsRetrying] = useState(false);
  const { data: session, status } = useSession();

  const isAdmin = session?.user?.email === "lahirikishalay@gmail.com";

  const fetchArticles = async () => {
    try {
      setError(null);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/articles`
      );
      setArticles(res.data);
    } catch (error) {
      console.error("Failed to fetch articles: ", error);
      setError("Failed to load articles. Please check your connection.");
    }
  };

  const handleRetry = async () => {
    setIsRetrying(true);
    await fetchArticles();
    setIsRetrying(false);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header Section */}
      <Head>
        <title>TrendWise – Discover Trending Content</title>
        <meta
          name="description"
          content="Automatically generated blogs on trending topics using Gemini AI."
        />
        <meta
          property="og:title"
          content="TrendWise – AI-Powered Trending Articles"
        />
        <meta
          property="og:description"
          content="Explore blogs generated from real-time Google Trends using Gemini."
        />
        <meta property="og:type" content="website" />
      </Head>

      <header className="pt-12 pb-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            TrendWise
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover the latest insights and trending topics that shape our
            world
          </p>
          {status === "authenticated" && isAdmin && (
            <div className="mt-4">
              <Link
                href="/admin"
                className="inline-block px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
              >
                Go to Admin
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 pb-16">
        {/* Loading State */}
        {articles === null && !error && (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-200 border-t-purple-600 mb-4"></div>
            <p className="text-gray-600 text-lg">
              Discovering amazing articles...
            </p>
          </div>
        )}

        {error && (
          <div className="text-center py-16">
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
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Oops! Something went wrong
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">{error}</p>
            <button
              onClick={handleRetry}
              disabled={isRetrying}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-purple-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRetrying ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  Retrying...
                </>
              ) : (
                <>
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
                </>
              )}
            </button>
          </div>
        )}

        {articles && articles.length === 0 && (
          <div className="text-center py-16">
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
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No Articles Yet
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              We&apos;re working hard to bring you amazing content. Check back
              soon for the latest insights and trends!
            </p>
          </div>
        )}

        {articles && articles.length > 0 && (
          <div className="space-y-8">
            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, index) => (
                <div
                  key={article._id}
                  className="transform hover:scale-105 transition-all duration-300"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: "fadeInUp 0.6s ease-out forwards",
                    opacity: 0,
                  }}
                >
                  <ArticleCard article={article} />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Inline CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
