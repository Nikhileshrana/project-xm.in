import React from "react";
import Tours from "@/components/Tours";
import { Features } from "@/components/Features";
import type { Metadata } from "next";
import { getTours } from "@/lib/api";
import { Suspense } from "react";
import { type } from "os";

export const metadata: Metadata = {
  title: "Tour Packages in India | Indian Travel Tour",
  description:
    "Indian Travel Tour offers popular India tour packages where you will experience different culture, tradition and rich history. Customized trips for families, couples & solo travelers",
  keywords: [
    "India Tour Packages",
    "Book Travel Packages",
    "Jaipur Tours",
    "Rajasthan Travel",
    "Agra Trip",
    "Taj Mahal Trip",
    "Budget Tour Packages",
  ],
  openGraph: {
    title: "Tour Packages in India | Indian Travel Tour",
    description:
      "Indian Travel Tour offers popular India tour packages where you will experience different culture, tradition and rich history. Customized trips for families, couples & solo travelers",
    url: "https://www.indiantraveltour.in/tour",
    type: "website",
    siteName: "Indian Travel Tour",
    locale: "en_US",
    images: [
      {
        url: "https://yzgm9kgloi90e8nh.public.blob.vercel-storage.com/MetaImage",
        width: 1200,
        height: 630,
        alt: "Book Tour Packages in India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tour Packages in India | Indian Travel Tour",
    description:
      "Indian Travel Tour offers popular India tour packages where you will experience different culture, tradition and rich history. Customized trips for families, couples & solo travelers",
    images: [
      "https://yzgm9kgloi90e8nh.public.blob.vercel-storage.com/MetaImage",
    ],
  },
  alternates: {
    canonical: "https://www.indiantraveltour.in/tour",
  },
};

export default async function ToursPage() {
  const tours = await getTours();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        type: "WebPage",
        item: "https://www.indiantraveltour.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tour Packages",
        type: "WebPage",
        item: "https://www.indiantraveltour.in/tour",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<p>Loading related tours...</p>}>
        <Tours initialTours={tours} />
      </Suspense>
      <Features />
    </>
  );
}
