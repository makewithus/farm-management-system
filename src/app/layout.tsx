import type { Metadata } from "next";
import { Inter, Urbanist } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Harvesta | Intelligent OS",
  description: "Modern commercial scale farm management OS.",
  manifest: "/manifest.json",
};

import AuthProvider from "@/providers/SessionProvider";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  let theme = "light";

  if (session?.user?.id) {
    try {
      const user = await db.user.findUnique({
        where: { id: session.user.id },
        select: { farm: { select: { settings: true } } }
      });
      if (user?.farm?.settings?.theme) {
        theme = user.farm.settings.theme;
      }
    } catch (e) {
      // Ignore DB error during build or startup
    }
  }

  return (
    <html
      lang="en"
      className={`${inter.variable} ${urbanist.variable} h-full antialiased`}
      data-theme={theme}
    >
      <body className="min-h-full flex flex-col bg-page-bg text-text-body">
        <AuthProvider>
          {children}
          <Toaster 
            position="top-right" 
            richColors 
            toastOptions={{
              style: {
                borderRadius: '8px',
                border: '1px solid #E3E4D6',
                fontFamily: 'var(--font-sans)',
                fontWeight: '600',
                fontSize: '13px',
                boxShadow: '0 2px 8px rgba(46, 58, 28, 0.08)',
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
