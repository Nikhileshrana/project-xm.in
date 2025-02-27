import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";


const fetchTourPackages = async (): Promise<string[]> => {
  try {
    const res = await fetch(`${BASE_URL}/api/getAllPackageNames`);
    if (!res.ok) throw new Error("Failed to fetch tour packages");
    
    const data = await res.json();
    return data.packageNames || [];
  } catch (error) {
    console.error("Error fetching tour packages:", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const tourPackages = await fetchTourPackages();

  return [
    { url: `${BASE_URL}/`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1.00 },
    { url: `${BASE_URL}/tour`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1.00 },
    ...tourPackages.map((packageName) => ({
      url: `${BASE_URL}/tour/${packageName}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    })),
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.8 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.5 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.5 },
  ];
}