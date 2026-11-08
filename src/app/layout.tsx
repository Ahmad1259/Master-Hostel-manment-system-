import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import hostelConfig from "../../hostel.config";
import { AppProvider } from "../lib/store";
import { CookieConsentBanner } from "../components/ui/cookie-consent-banner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#059669",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || "https://grandpavilion.pk"),
  title: `${hostelConfig.identity.name} | Serviced Student Hostel in ${hostelConfig.geo.city}`,
  description: `${hostelConfig.identity.name} provides serviced student chambers in ${hostelConfig.geo.neighborhood}, ${hostelConfig.geo.city} with 100% solar and generator power redundancy, three daily meals, and high-speed fiber internet.`,
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
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${inter.variable} ${notoArabic.variable}`}
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
      </head>
      <body className="bg-[#F9FAFB] text-[#111827] min-h-screen antialiased selection:bg-emerald-100 selection:text-emerald-900 font-sans">
        <AppProvider>
          {children}
          <CookieConsentBanner />
        </AppProvider>
      </body>
    </html>
  );
}
