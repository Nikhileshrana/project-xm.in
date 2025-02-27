# Travel Booking Platform


## Overview
This is a **Next.js**-based travel booking platform that provides dynamic tour packages, an admin portal for managing tours, AI-powered itinerary generation, live weather updates, automated marketing emails, and more. It has a **100, 100, 100, 100 Lighthouse score** on mobile and desktop.

## Tech Stack
- **Frontend:** Next.js 15 (App Router), React.js, TypeScript, TailwindCSS, ShadCN, Framer Motion
- **Backend:** MongoDB, API Routes (CRUD operations)
- **Authentication:** Clerk Middleware Authentication
- **AI Integration:** Vercel AI SDK (Gemini 2.0 Flash, OpenAI) for itinerary generation and tour recommendations
- **Image Storage:** Vercel Blob Storage
- **SEO Optimization:** SSR, SSG, automated `sitemap.xml` and `robots.txt`
- **Email Service:** Nodemailer (for booking and marketing emails to users and admins)
- **Analytics:** Google Analytics integration
- **API Requests:** Axios, Fetch API
- **Validation:** Zod for backend validation

## Features
### **User Features**
- Browse dynamic tour packages fetched from the database
- AI-powered itinerary generator based on preferences
- Live weather updates for selected destinations
- Automated booking and confirmation emails
- Secure authentication using Clerk
- Contact form with email notifications

### **Admin Features**
- Admin portal for CRUD operations on tour packages
- View booking details and analytics graphs
- Manage uploaded images using Vercel Blob Storage

### **AI-Powered Functionalities**
- Tour package recommendations based on user input and database
- AI-powered itinerary generator
- AI-powered tour booking assistant

## Project Directory Structure
```
public/
src/
├── ai/
│   ├── tools.ts
│
├── app/
│   ├── admin/
│   │   ├── page.tsx
│   ├── api/
│   │   ├── ai/
│   │   │   ├── genui/
│   │   │   │   ├── route.ts
│   │   ├── create/
│   │   │   ├── route.ts
│   │   ├── delete/
│   │   │   ├── [id]/
│   │   ├── getAllPackageNames/
│   │   │   ├── route.ts
│   │   ├── mongoDB/
│   │   │   ├── book/
│   │   │   ├── listBookings/
│   │   ├── nodemailer/
│   │   │   ├── book/
│   │   │   ├── contact/
│   │   ├── read/
│   │   │   ├── route.ts
│   │   ├── readBySlug/
│   │   │   ├── route.ts
│   │   ├── relatedTourPackage/
│   │   │   ├── route.ts
│   │   ├── update/
│   │   │   ├── route.ts
│   │   ├── vercelBlobDelete/
│   │   │   ├── route.ts
│   │   ├── vercelBlobUpload/
│   │   │   ├── route.ts
│   ├── contact/
│   │   ├── page.tsx
│   ├── legal/
│   │   ├── privacy/
│   │   │   ├── page.tsx
│   │   ├── terms/
│   │   │   ├── page.tsx
│   ├── sign-in/
│   │   ├── [[...sign-in]]
│   ├── tour/
│   │   ├── [packageName]/
│   │   │   ├── BookingProcess.tsx
│   │   │   ├── TourPackageDetails.tsx
│   │   │   ├── page.tsx
│   │   ├── page.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── robots.ts
│   ├── sitemap.ts
│
├── components/
│   ├── ui/
│   │   ├── AdminComponent.tsx
│   │   ├── Ai.tsx
│   │   ├── Faq.tsx
│   │   ├── Features.tsx
│   │   ├── Footer.tsx
│   │   ├── FooterWrapper.tsx
│   │   ├── Hero-Section.tsx
│   │   ├── Navbar.tsx
│   │   ├── Testimonial.tsx
│   │   ├── Tours.tsx
│   │   ├── theme-provider.tsx
│
├── lib/
│   ├── api.ts
│   ├── mongoDB.ts
│   ├── types.ts
│   ├── utils.ts
│
├── middleware.ts
├── .gitignore
├── README.md
├── components.json
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
```

## Installation & Setup
### **1. Clone the repository**
```sh
git clone https://github.com/your-repo/travel-booking.git
cd travel-booking
```
### **2. Install dependencies**
```sh
pnpm install
```
### **3. Environment Variables**
Create a `.env.local` file and add the necessary environment variables:
```sh
MONGODB_URI=<your-mongodb-uri>
NEXT_PUBLIC_CLERK_FRONTEND_API=<your-clerk-frontend-api>
CLERK_SECRET_KEY=<your-clerk-secret-key>
MASTER_CLERK_USERID=<adminaccess>
MASTER_CLERK_USERID2=<adminacsess>
NEXT_PUBLIC_VERCEL_BLOB_TOKEN=<your-vercel-blob-token>
OPENAI_API_KEY=<your-openai-api-key>
GEMINI_API_KEY=<your-gemini-api-key>
NEXT_PUBLIC_GOOGLE_ANALYTICS=<your-ga-id>
EMAIL_USER=<nodemailer>
EMAIL_PASS=<nodemailer>
```

### **4. Run the project**
#### **Development Mode**
```sh
pnpm dev
```
#### **Build the project**
```sh
pnpm build
```
#### **Run in Production**
```sh
pnpm start
```

## API Routes
### **Public APIs**
- `GET /api/read` → Fetch all tour packages
- `GET /api/readBySlug` → Fetch tour package details by slug
- `POST /api/nodemailer/contact` → Send contact emails
- `POST /api/nodemailer/book` → Send booking confirmation emails

### **Admin APIs** (Requires Authentication)
- `POST /api/create` → Create a new tour package
- `PATCH /api/update` → Update tour package details
- `DELETE /api/delete/[id]` → Delete a tour package
- `GET /api/mongoDB/listBookings` → Fetch all bookings
- `POST /api/vercelBlobUpload` → Upload images to Vercel Blob
- `DELETE /api/vercelBlobDelete` → Delete images from Vercel Blob

## Contribution Guidelines
1. Fork the repository
2. Create a new branch (`feature/new-feature`)
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License
This project is licensed under the **MIT License**.

---
### **Author**: [Nikhilesh Rana]
### **Contact**: realnikhileshrana@gmail.com

