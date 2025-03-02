import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/Navbar";
import FooterWrapper from "@/components/FooterWrapper";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Best Tour Packages in India | Indian Travel Tour",
  description:
    "Govt-approved tour operator in New Delhi since 2007. Top-rated on TripAdvisor/Trustpilot, Custom trips at best rates in India, Nepal, Bhutan & Sri Lanka.",
  openGraph: {
    title: "Best Tour Packages in India | Indian Travel Tour",
    description:
      "Govt-approved tour operator in New Delhi since 2007. Top-rated on TripAdvisor/Trustpilot, Custom trips at best rates in India, Nepal, Bhutan & Sri Lanka.",
    url: "https://www.indiantraveltour.in",
    type: "website",
    images: [
      {
        url: "https://yzgm9kgloi90e8nh.public.blob.vercel-storage.com/MetaImage", // Replace with actual image URL
        width: 1200,
        height: 630,
        alt: "Tour Package",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Tour Packages in India | Indian Travel Tour",
    description:
      "Govt-approved tour operator in New Delhi since 2007. Top-rated on TripAdvisor/Trustpilot. Custom trips at best rates in India, Nepal, Bhutan & Sri Lanka.",
    images: [
      "https://yzgm9kgloi90e8nh.public.blob.vercel-storage.com/MetaImage.jpg",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-CZVDB0N26Q"
      />
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-CZVDB0N26Q');
              `,
        }}
      />

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Navbar />
          {children}
          <FooterWrapper />
        </ThemeProvider>
      </body>
    </html>
  );
}
