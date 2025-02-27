import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | Indian Travel Tour",
  description:
    "Read our comprehensive terms of service to understand your rights and responsibilities when using our travel services in India.",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white pb-4 mb-6 border-b border-gray-200 dark:border-gray-700">
          Terms of Service
        </h1>
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200">1. Acceptance of Terms</h2>
          <p className="text-gray-600 dark:text-gray-300">
            By accessing and using our travel services, you agree to be bound by these Terms of Service, which are
            governed by the laws of India.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200">2. Use of Services</h2>
          <p className="text-gray-600 dark:text-gray-300">
            You agree to use our services only for lawful purposes and in accordance with these terms. Any violation of
            Indian laws or regulations while using our services is strictly prohibited.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200">
            3. Booking and Cancellations
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            All bookings are subject to availability and confirmation. Cancellation policies may vary depending on the
            service provider and the type of booking. Please refer to the specific cancellation policy provided at the
            time of booking.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3 text-gray-800 dark:text-gray-200">3.1 Refund Policy</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Refunds, if applicable, will be processed in accordance with the guidelines set by the Reserve Bank of India
            (RBI). Processing times may vary depending on the payment method and your bank.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200">
            4. Passport and Visa Requirements
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            It is the traveler's responsibility to ensure they have a valid passport and any necessary visas for their
            journey. We recommend checking the latest requirements with the Ministry of External Affairs, Government of
            India, or the respective embassies of the countries you plan to visit.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200">5. Health and Safety</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Travelers are advised to check and follow health advisories issued by the Ministry of Health and Family
            Welfare, Government of India, for both domestic and international travel. This includes any vaccination
            requirements or travel restrictions that may be in place.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200">6. Liability</h2>
          <p className="text-gray-600 dark:text-gray-300">
            While we strive to provide accurate information, we cannot be held liable for any inaccuracies or service
            failures beyond our control. Our liability is limited to the extent permitted by Indian law.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200">7. Intellectual Property</h2>
          <p className="text-gray-600 dark:text-gray-300">
            All content on this website, including text, graphics, logos, and software, is the property of Your Indian
            Travel Company or its content suppliers and is protected by Indian copyright laws.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200">8. Dispute Resolution</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Any disputes arising from the use of our services shall be subject to the exclusive jurisdiction of the
            courts in [Your City], India. We encourage users to first attempt to resolve any issues directly with our
            customer service team.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200">9. Changes to Terms</h2>
          <p className="text-gray-600 dark:text-gray-300">
            We reserve the right to modify these terms at any time. Any changes will be effective immediately upon
            posting on this website. Your continued use of our services after any such changes constitutes your
            acceptance of the new Terms of Service.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200">10. Contact Information</h2>
          <p className="text-gray-600 dark:text-gray-300">
            If you have any questions about these Terms of Service, please contact us at:
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
        </div>
    
      </div>
    </div>
  )
}

