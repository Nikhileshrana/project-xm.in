import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Indian Travel Tour",
  description:
    "Read Indian Travel Tour's Privacy Policy to learn how we collect, use, and protect your personal data when booking tour packages. Your privacy and security are our top priority.",
  keywords: [
    "Indian Travel Tour Privacy Policy",
    "Privacy Policy for Travel Booking",
    "User Privacy in Travel Services",
    "Secure Tour Booking",
    "Travel Website GDPR Compliance",
    "Tour Booking Privacy Policy",
    "Indian Travel Security Policy",
  ],
  openGraph: {
    title: "Privacy Policy | Indian Travel Tour",
    description:
      "Learn about our commitment to protecting your personal information. Read our Privacy Policy to understand how we handle data security and user privacy.",
    url: "https://indiantraveltour.in/privacy",
    type: "website",
    siteName: "Indian Travel Tour",
    locale: "en_US",
    images: [
      {
        url: "https://yzgm9kgloi90e8nh.public.blob.vercel-storage.com/MetaImage",
        width: 1200,
        height: 630,
        alt: "Indian Travel Tour Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Indian Travel Tour",
    description:
      "Find out how we handle your personal data securely when you book a tour with Indian Travel Tour. Your privacy matters to us.",
    images: [
      "https://yzgm9kgloi90e8nh.public.blob.vercel-storage.com/MetaImage",
    ],
  },
  alternates: {
    canonical: "https://www.indiantraveltour.in/privacy",
  },
};


export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white pb-4 mb-6 border-b border-gray-200 dark:border-gray-700">
          Privacy Policy
        </h1>
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200">1. Introduction</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Your Indian Travel Company is committed to protecting your privacy and ensuring the security of your
            personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your
            information when you use our travel services. This policy is in compliance with the Information Technology
            Act, 2000, and the Information Technology (Reasonable Security Practices and Procedures and Sensitive
            Personal Data or Information) Rules, 2011.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200">2. Information We Collect</h2>
          <p className="text-gray-600 dark:text-gray-300">
            We collect personal information that you provide directly to us when using our services, including but not
            limited to:
          </p>
          <ul className="list-disc pl-6 mt-2 text-gray-600 dark:text-gray-300">
            <li>Name, email address, phone number, and billing address</li>
            <li>Passport details and visa information</li>
            <li>Travel preferences and itinerary details</li>
            <li>Payment information (processed securely through authorized payment gateways)</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200">
            3. How We Use Your Information
          </h2>
          <p className="text-gray-600 dark:text-gray-300">We use your information for various purposes, including:</p>
          <ul className="list-disc pl-6 mt-2 text-gray-600 dark:text-gray-300">
            <li>Providing, maintaining, and improving our services</li>
            <li>Processing your travel bookings and transactions</li>
            <li>Communicating with you about your bookings, offers, and updates</li>
            <li>Complying with legal obligations</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200">
            4. Information Sharing and Disclosure
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            We do not sell your personal information. We may share information with:
          </p>
          <ul className="list-disc pl-6 mt-2 text-gray-600 dark:text-gray-300">
            <li>Service providers (e.g., airlines, hotels) to fulfill your bookings</li>
            <li>Payment processors to complete transactions</li>
            <li>Government authorities when required by law</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200">5. Data Security</h2>
          <p className="text-gray-600 dark:text-gray-300">
            We implement reasonable security measures to protect your personal information from unauthorized access,
            alteration, disclosure, or destruction. These measures are in compliance with the Information Technology
            (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200">6. Your Rights</h2>
          <p className="text-gray-600 dark:text-gray-300">Under Indian law, you have the right to:</p>
          <ul className="list-disc pl-6 mt-2 text-gray-600 dark:text-gray-300">
            <li>Access and review your personal information</li>
            <li>Correct any inaccuracies in your personal information</li>
            <li>Withdraw consent for the use of your personal information</li>
            <li>Request the deletion of your personal information, subject to legal requirements</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200">7. Data Retention</h2>
          <p className="text-gray-600 dark:text-gray-300">
            We retain your personal information for as long as necessary to fulfill the purposes outlined in this
            Privacy Policy, unless a longer retention period is required or permitted by law.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200">
            8. Cookies and Tracking Technologies
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            We use cookies and similar tracking technologies to enhance your experience on our website. You can manage
            your cookie preferences through your browser settings.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200">9. Children's Privacy</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Our services are not intended for individuals under the age of 18. We do not knowingly collect personal
            information from children.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200">10. Changes to This Policy</h2>
          <p className="text-gray-600 dark:text-gray-300">
            We may update this privacy policy from time to time. We will notify you of any significant changes by
            posting the new policy on this page and updating the "Last Updated" date.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200">11. Grievance Officer</h2>
          <p className="text-gray-600 dark:text-gray-300">
            In accordance with Information Technology Act, 2000 and rules made there under, the name and contact details
            of the Grievance Officer are provided below:
          </p>
          <address className="mt-4 text-gray-600 dark:text-gray-300">
            Duni Rana
            <br />
            Indian Travel Tour
            <br />
            222, Pocket-7, Sector 21
            <br />
            Rohini, New Delhi, Delhi, 110086
            <br />
            Email: contactravelforce@gmail.com
            <br />
            Phone: +91 9811171495
          </address>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200">12. Contact Us</h2>
          <p className="text-gray-600 dark:text-gray-300">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <address className="mt-4 text-gray-600 dark:text-gray-300">
            Indian Travel Tour
            <br />
            222, Pocket-7, Sector 21
            <br />
            Rohini, New Delhi, Delhi, 110086
            <br />
            Email: contactravelforce@gmail.com
            <br />
            Phone: +91 9811171495
          </address>

          <p className="mt-8 text-gray-600 dark:text-gray-300">Last Updated: 2/08/2025</p>
        </div>
       
      </div>
    </div>
  )
}

