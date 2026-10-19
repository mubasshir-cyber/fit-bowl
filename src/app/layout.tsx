import type { Metadata } from "next";
import { Bricolage_Grotesque, Nunito, Caveat } from "next/font/google";
import "./globals.css";
import { FAQS_DATA } from "@/data/faqs";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700", "800"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fitbowl.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "FitBowl — Healthy Meal Subscription in Mumbai | Fresh Veg & Non-Veg Bowls",
  description:
    "Chef-crafted, macro-balanced healthy meal subscription delivered across Mumbai (Andheri, Bandra, Powai, Lower Parel). 14 signature bowls. Claim your free trial today!",
  keywords: [
    "healthy meal subscription mumbai",
    "diet meal delivery mumbai",
    "healthy lunch bowls mumbai",
    "high protein meal delivery mumbai",
    "office lunch subscription mumbai",
    "free trial healthy food mumbai",
  ],
  authors: [{ name: "FitBowl Culinary Team" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "FitBowl — Healthy Meal Subscription in Mumbai",
    description:
      "Fresh, chef-crafted healthy bowls delivered to your home or office in Mumbai. One free trial meal with zero payment required.",
    locale: "en_IN",
    type: "website",
    url: baseUrl,
    siteName: "FitBowl",
    images: [
      {
        url: "/images/hero/hero-bowl.jpg",
        width: 1200,
        height: 630,
        alt: "FitBowl Gourmet Healthy Meal Bowl with Fresh Ingredients",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FitBowl — Healthy Meal Subscription in Mumbai",
    description:
      "Chef-crafted, macro-balanced healthy meal subscription delivered across Mumbai. 14 signature bowls. Claim your free trial today!",
    images: ["/images/hero/hero-bowl.jpg"],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/icon.svg",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLdFoodEstablishment = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    name: "FitBowl",
    image: `${baseUrl}/images/hero/hero-bowl.jpg`,
    description:
      "Healthy meal subscription service delivering freshly cooked veg and non-veg gourmet bowls across Mumbai.",
    servesCuisine: ["Healthy", "Indian", "Mediterranean", "Asian"],
    priceRange: "₹₹",
    telephone: "+919876543210",
    email: "hello@fitbowl.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Andheri, Mumbai" },
      { "@type": "AdministrativeArea", name: "Bandra, Mumbai" },
      { "@type": "AdministrativeArea", name: "Powai, Mumbai" },
      { "@type": "AdministrativeArea", name: "Lower Parel, Mumbai" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "08:00",
        closes: "20:00",
      },
    ],
  };

  const jsonLdFaqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS_DATA.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${nunito.variable} ${caveat.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdFoodEstablishment),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdFaqPage),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
