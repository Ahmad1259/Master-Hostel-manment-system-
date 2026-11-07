import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXTAUTH_URL || "https://grandpavilion.pk";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/privacy", "/terms", "/#rooms", "/#amenities", "/#inquire", "/#virtual-tour"],
        disallow: ["/dashboard", "/dashboard/*", "/api/*", "/_next/*"],
      },
      {
        userAgent: "GPTBot",
        allow: ["/"],
        disallow: ["/dashboard/*", "/api/*"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
