import { getTours } from "@/lib/api";
import type { Metadata } from "next";
import Script from "next/script";
import { HeroSection } from "@/components/Hero-Section";
import Faq from "@/components/Faq";
import { MarqueeAnimation } from "@/components/ui/marquee-effect";
import { Features } from "@/components/Features";
import Testimonial from "@/components/Testimonial";
import Tours from "@/components/Tours";
import { Pricing } from "@/components/ui/pricing-section-with-comparison";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Best Tour Packages in India | Indian Travel Tour",
  description:
    "Top-rated Govt. approved tour operator in New Delhi since 2007. Discover customized trips across India, Nepal, Bhutan & Sri Lanka with the best deals!",
  keywords: [
    "India Tour Packages",
    "Jaipur Tours",
    "Agra Taj Mahal Trip",
    "Rajasthan Travel",
    "Taj Mahal one day trip",
    "Budget Travel India",
  ],
  openGraph: {
    title: "Best Tour Packages in India | Indian Travel Tour",
    description:
      "Top-rated Govt. approved tour operator in New Delhi since 2007. Discover customized trips across India, Nepal, Bhutan & Sri Lanka with the best deals!",
    url: "https://www.indiantraveltour.in/",
    type: "website",
    siteName: "Indian Travel Tour",
    locale: "en_US",
    images: [
      {
        url: "https://yzgm9kgloi90e8nh.public.blob.vercel-storage.com/MetaImage",
        width: 1200,
        height: 630,
        alt: "Book Tours with Indian Travel Tour",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Indian Travel Tour | Book Now, Pay on Arrival!",
    description:
      "Top-rated Govt. approved tour operator in New Delhi since 2007. Discover customized trips across India, Nepal, Bhutan & Sri Lanka with the best deals!",
    images: ["https://yzgm9kgloi90e8nh.public.blob.vercel-storage.com/MetaImage"],
  },
  alternates: {
    canonical: "https://www.indiantraveltour.in/",
  },
};

export default async function page() {

  const tours = await getTours();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Indian Travel Tour Info",
    url: "https://www.indiantraveltour.in",
    logo: "https://www.indiantraveltour.in/logo.png",
    address: "Rohini Delhi, India 110086",
    sameAs: [
      "https://www.facebook.com/indianexperience.in/",
      "https://x.com/indiantravltour",
      "https://www.linkedin.com/in/dunirana/",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-9811171495",
      address: "Rohini Delhi, India 110086",
      contactType: "customer service",
      areaServed: ["US", "GB", "CA", "DE", "JP", "IN"],
      availableLanguage: ["English", "Japanese", "German", "Hindi"],
    },
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://www.indiantraveltour.in/#breadcrumb",
    "name": "Indian Travel Tour",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": {
          "@type": "WebPage",
          "@id": "https://www.indiantraveltour.in",
          "url": "https://www.indiantraveltour.in",
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
        "name": "Contact Us",
        "item": {
          "@type": "WebPage",
          "@id": "https://www.indiantraveltour.in/contact",
          "url": "https://www.indiantraveltour.in/contact",
          "name": "Contact Us"
        }
      }
    ]
  }
  


  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <HeroSection
        badge={{
          text: "Indian Travel Tour.",
          action: {
            text: "Explore our most popular tours",
            href: "/tour",
          },
        }}
        title="Book Now, Pay on Arrival!"
        description="Govt-approved tour operator in New Delhi since 2007. Top-rated on TripAdvisor/Trustpilot. Custom trips at best rates in India, Nepal, Bhutan & Sri Lanka."
        image={{
          light: "/hero.jpg",
          alt: "Hero Image",
        }}
      />

      <div className="flex flex-col gap-4 mt-5 sm:mt-0">
        <MarqueeAnimation
          direction="left"
          baseVelocity={-1}
          className="bg-amber-600 text-white py-2"
        >
          ✅ All-Inclusive Packages 🎒 Cabs, Hotels & Sightseeing 🌍 Explore Taj
          Mahal, Jaipur & More!
        </MarqueeAnimation>
        <MarqueeAnimation
          direction="right"
          baseVelocity={-1}
          className="bg-blue-500 text-white py-2"
        >
          🌟 Custom & Predefined Tour Packages! ✈️ Hassle-Free Travel 🏨 Stay,
          Meals, & Transport Included.
        </MarqueeAnimation>
      </div>

      <Suspense fallback={<p>Loading tours...</p>}>
        <Tours initialTours={tours} />
      </Suspense>
      <Pricing />
      <Features />
      <Testimonial />
      <Faq />
    </>
  );
}
