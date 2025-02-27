import type { Tour, TourPackage } from "./types";

export async function getTours(): Promise<Tour[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/read`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch tours: ${res.statusText}`);
    }
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error("❌ Error fetching tours:", error);
    return []; // Return empty array to prevent crashes
  }
}

export async function getTourPackage(
  slug: string
): Promise<TourPackage | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/readBySlug`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch tour package: ${res.statusText}`);
    }
    const data = await res.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error("❌ Error fetching tour package:", error);
    return null;
  }
}

export async function getRelatedTourPackage() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/relatedTourPackage`,
      {
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch related tours: ${res.statusText}`);
    }
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error("❌ Error fetching related tour packages:", error);
    return [];
  }
}
