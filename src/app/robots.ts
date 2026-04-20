import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/coming-soon"],
      },
    ],
    sitemap: "https://maldivesnavigator.com/sitemap.xml",
    host: "https://maldivesnavigator.com",
  };
}
