import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/articles`
    );
    const articles = await res.json();

    const urls = articles
      .map(
        (article) => `
    <url>
      <loc>${process.env.NEXT_PUBLIC_FRONTEND_URL}/article/${article.slug}</loc>
    </url>`
      )
      .join("");

    const xml = `<?xml version="1.0" encoding="UTF-8" ?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls}
  </urlset>`;

    return new NextResponse(xml, {
      headers: { "Content-Type": "application/xml" },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new NextResponse("Failed to generate sitemap", { status: 500 });
  }
}
