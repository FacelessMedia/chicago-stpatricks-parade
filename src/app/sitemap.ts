import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://chicagostpatricksdayparade.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/parade-info",
    "/packages",
    "/events",
    "/queen-contest",
    "/grand-marshal",
    "/guest-of-honor",
    "/parade-theme",
    "/gallery",
    "/sponsors",
    "/grandstand-seats",
    "/cbc-dinner",
    "/light-pole-banner",
    "/ad-book",
    "/raffle",
    "/register",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/packages" || route === "/register" ? 0.9 : 0.7,
  }));
}
