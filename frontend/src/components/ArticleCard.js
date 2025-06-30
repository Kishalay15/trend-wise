"use client";
import Link from "next/link";

export default function ArticleCard({ article }) {
  if (!article) return null;

  return (
    <article className="group relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-300 p-6 h-full flex flex-col overflow-hidden">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Title */}
        <Link href={`/article/${article.slug}`} className="flex-grow">
          <h2 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors duration-200 line-clamp-3 mb-3 leading-tight">
            {article.title}
          </h2>
        </Link>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4 flex-grow">
          {article.metaDesc.replace(/\*\*/g, "")}
        </p>

        {/* Read more link */}
        <Link
          href={`/article/${article.slug}`}
          className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors duration-200 mt-auto"
        >
          Read more
          <svg
            className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>

      {/* Decorative border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-2xl"></div>
    </article>
  );
}
