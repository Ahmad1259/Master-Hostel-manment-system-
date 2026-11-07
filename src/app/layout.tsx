import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import hostelConfig from "../../hostel.config";
import { AppProvider } from "../lib/store";

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
  themeColor: "#2563EB",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || "https://grandpavilion.pk"),
  title: `${hostelConfig.identity.name} | Student Hostel in ${hostelConfig.geo.city}`,
  description: `${hostelConfig.identity.name} offers modern, serviced student accommodations in ${hostelConfig.geo.neighborhood}, ${hostelConfig.geo.city} with 100% power backup, 3 daily meals, and high-speed Wi-Fi.`,
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
      <body className="bg-slate-50 text-slate-900 min-h-screen antialiased selection:bg-blue-100 selection:text-blue-900">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
