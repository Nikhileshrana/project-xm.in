import type { Metadata, ResolvingMetadata } from "next";
import { getTourPackage, getRelatedTourPackage } from "@/lib/api";
import TourPackageDetails from "./TourPackageDetails";
import { Features } from "@/components/Features";
import Testimonial from "@/components/Testimonial";
import { notFound } from "next/navigation";
import { RelatedTourPackages } from "@/components/ui/RelatedTourPackages";
import  TravelPopup  from "@/components/travel-popup";

type Props = {
  params: Promise<{ packageName: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const packageName = (await params).packageName;
  const tourPackage = await getTourPackage(packageName);

  return {
    title: tourPackage?.heading1 ?? "404 - Tour Package Not Found",
    description: tourPackage?.heading2 ?? "Indian Travel Tour",
    keywords: tourPackage?.keywords ?? "India, travel, tour, package, trips",
    openGraph: {
      title: tourPackage?.heading1 ?? "Tour Package Not Found",
      description: tourPackage?.heading2 ?? "Indian Travel Tour",
      images: tourPackage?.imageURL
        ? [
            {
              url: tourPackage.imageURL ?? "/placeholder.svg",
              width: 1200,
              height: 630,
              alt: tourPackage.heading1 ?? "Tour Package Not Found",
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: tourPackage?.heading1 ?? "Tour Package Not Found",
      description: tourPackage?.heading2 ?? "Indian Travel Tour",
      images: tourPackage?.imageURL ?? "/placeholder.svg",
    },
    alternates: {
      canonical: tourPackage?.slug
        ? `https://www.indiantraveltour.in/tour/${tourPackage.slug}`
        : "https://www.indiantraveltour.in/tour",
    },
  }
}

export default async function TourPackagePage({ params, searchParams }: Props) {
  const packageName = (await params).packageName;

  const [tourPackage, relatedTourPackage] = await Promise.all([
    getTourPackage(packageName),
    getRelatedTourPackage(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://www.indiantraveltour.in/#breadcrumb",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": {
          "@type": "WebPage",
          "@id": "https://www.indiantraveltour.in/",
          "url": "https://www.indiantraveltour.in/",
          "name": "Home"
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Tour Packages",
        "item": {
          "@type": "WebPage",
          "@id": "https://www.indiantraveltour.in/tour",
          "url": "https://www.indiantraveltour.in/tour",
          "name": "Tour Packages"
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": tourPackage?.heading1 ?? "Tour Package Not Found",
        "item": {
          "@type": "WebPage",
          "@id": tourPackage?.slug
            ? `https://www.indiantraveltour.in/tour/${tourPackage.slug}`
            : "https://www.indiantraveltour.in/tour",
          "url": tourPackage?.slug
            ? `https://www.indiantraveltour.in/tour/${tourPackage.slug}`
            : "https://www.indiantraveltour.in/tour",
          "name": tourPackage?.heading1 ?? "Tour Package Not Found"
        }
      }
    ]
  };
  

  const jsonLdProduct = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": tourPackage?.slug
      ? `https://www.indiantraveltour.in/tour/${tourPackage.slug}`
      : "https://www.indiantraveltour.in/tour",
    "name": tourPackage?.heading1 ?? "Tour Package Not Found",
    "description": tourPackage?.heading2 ?? "Explore the best travel experiences",
    "image": [tourPackage?.imageURL ?? "/placeholder.svg"],
    "url": tourPackage?.slug
      ? `https://www.indiantraveltour.in/tour/${tourPackage.slug}`
      : "https://www.indiantraveltour.in/tour",
    "offers": {
      "@type": "Offer",
      "price": tourPackage?.price ? `${tourPackage.price}` : "0.00",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "validFrom": "2025-01-01"
    },
    "provider": {
      "@type": "TravelAgency",
      "name": "Indian Travel Tour",
      "url": "https://www.indiantraveltour.in",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Rohini",
        "addressLocality": "Delhi",
        "addressCountry": "India",
        "postalCode": "110086"
      },
      "telephone": "+91-9811171495"
    }
  };
  

  // If the tour package is not found, redirect to 404 page
  if (
    !tourPackage ||
    typeof tourPackage !== "object" ||
    !tourPackage.heading1
  ) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProduct) }}
      />

<TravelPopup/>

      <div className="min-h-screen bg-white dark:bg-background text-gray-900 dark:text-gray-100">
        <div className="container mx-auto px-2 py-4">
          <TourPackageDetails tourPackage={tourPackage} />
        </div>
      </div>
      <div className="w-[95%] sm:w-[90%] mx-auto px-2">
        <RelatedTourPackages packages={relatedTourPackage} />
      </div>
      <Features />
      <Testimonial />
    </>
  );
}
