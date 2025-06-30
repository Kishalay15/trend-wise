"use client";
import Link from "next/link";

export default function ArticleCard({ article }) {
  if (!article) return null;

  return (
    <article className="bg-white border border-gray-200 rounded p-6 h-full flex flex-col hover:shadow-sm transition-shadow duration-200">
      <div className="flex flex-col h-full">
        <Link href={`/article/${article.slug}`} className="flex-grow">
          <h2 className="text-lg font-semibold text-gray-900 hover:text-gray-700 line-clamp-3 mb-3 leading-tight">
            {article.title}
          </h2>
        </Link>

        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4 flex-grow">
          {article.metaDesc.replace(/\*\*/g, "")}
        </p>

        <Link
          href={`/article/${article.slug}`}
          className="text-sm text-gray-500 hover:text-gray-700 mt-auto"
        >
          Read more →
        </Link>
      </div>
    </article>
  );
}
