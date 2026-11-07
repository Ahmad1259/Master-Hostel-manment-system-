import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import hostelConfig from "../../hostel.config";
import { AppProvider } from "../lib/store";
import { PWAInstallPrompt } from "../components/pwa-install-prompt";
import Script from "next/script";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-arabic",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#B58544",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || "https://grandpavilion.pk"),
  title: {
    default: `${hostelConfig.identity.name} | Student Hostel in ${hostelConfig.geo.neighborhood}, ${hostelConfig.geo.city}`,
    template: `%s | ${hostelConfig.identity.name}`,
  },
  description: `${hostelConfig.identity.name} offers premium student accommodations in ${hostelConfig.geo.neighborhood}, ${hostelConfig.geo.city} near ${hostelConfig.geo.nearbyInstitutions[0].name}. Featuring 100% solar/diesel backup, 3 organic meals daily, silent AC study suites, and 24/7 security.`,
  keywords: [
    "Hostel in Gulberg Lahore",
    "Student Hostel Lahore",
    "Hostel near LUMS",
    "Hostel near FC College",
    "Executive Hostel Lahore",
    "Boys Hostel Lahore",
    "Commercial Hostel ERP",
    "Hostel Management System",
  ],
  authors: [{ name: hostelConfig.identity.legalEntity }],
  creator: hostelConfig.identity.legalEntity,
  publisher: hostelConfig.identity.legalEntity,
  verification: {
    google: hostelConfig.analytics.googleSearchConsoleVerification,
  },
  openGraph: {
    title: `${hostelConfig.identity.name} | Premium Student Living in ${hostelConfig.geo.city}`,
    description: hostelConfig.identity.tagline,
    url: "https://grandpavilion.pk",
    siteName: hostelConfig.identity.name,
    locale: "en_PK",
    type: "website",
    images: [
      {
        url: "/icons/icon-512.svg",
        width: 512,
        height: 512,
        alt: `${hostelConfig.identity.name} Monogram & Architectural Identity`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: hostelConfig.identity.name,
    description: hostelConfig.identity.tagline,
    images: ["/icons/icon-512.svg"],
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icons/icon-192.svg",
    apple: "/icons/icon-192.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Hostel",
        "@id": "https://grandpavilion.pk/#hostel",
        name: hostelConfig.identity.name,
        legalName: hostelConfig.identity.legalEntity,
        description: hostelConfig.identity.tagline,
        telephone: hostelConfig.identity.phone,
        email: hostelConfig.identity.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: hostelConfig.geo.address,
          addressLocality: hostelConfig.geo.city,
          postalCode: hostelConfig.geo.postalCode,
          addressCountry: "PK",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: hostelConfig.geo.geoCoordinates.latitude,
          longitude: hostelConfig.geo.geoCoordinates.longitude,
        },
        priceRange: "PKR 22000 - PKR 48000",
        currenciesAccepted: "PKR",
        paymentAccepted: "Bank Transfer, Cash, Bank Deposit Challan",
        amenityFeature: hostelConfig.amenities.map((a) => ({
          "@type": "LocationFeatureSpecification",
          name: a.title,
          value: true,
        })),
      },
      {
        "@type": "Organization",
        "@id": "https://grandpavilion.pk/#organization",
        name: hostelConfig.identity.legalEntity,
        url: "https://grandpavilion.pk",
        logo: "https://grandpavilion.pk/icons/monogram.svg",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: hostelConfig.identity.phone,
          contactType: "customer service",
          areaServed: "PK",
          availableLanguage: ["English", "Urdu"],
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      dir="ltr"
      className={`${playfair.variable} ${inter.variable} ${notoArabic.variable}`}
    >
      <head>
        {/* Anti-stale service worker purge script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if ('serviceWorker' in navigator) {
                  navigator.serviceWorker.getRegistrations().then(function(regs) {
                    for (var r of regs) { r.unregister(); }
                  });
                }
                if ('caches' in window) {
                  caches.keys().then(function(names) {
                    for (var n of names) { caches.delete(n); }
                  });
                }
              } catch(e) {}
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {hostelConfig.analytics.ga4MeasurementId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${hostelConfig.analytics.ga4MeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${hostelConfig.analytics.ga4MeasurementId}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className="bg-canvas text-ink min-h-screen selection:bg-brass-light selection:text-ink antialiased">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
