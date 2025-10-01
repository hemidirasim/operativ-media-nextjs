import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Operativ Media - Azərbaycanın ən etibarlı xəbər portalı",
    template: "%s | Operativ Media"
  },
  description: "Azərbaycanın ən etibarlı xəbər portalı. Son xəbərlər, siyasət, iqtisadiyyat, idman, mədəniyyət və daha çox sahədə ən aktual məlumatlar.",
  keywords: [
    "xəbərlər",
    "azərbaycan",
    "siyasət",
    "iqtisadiyyat", 
    "idman",
    "mədəniyyət",
    "operativ media",
    "azərbaycan xəbərləri",
    "gündəm",
    "aktual xəbərlər"
  ],
  authors: [{ name: "Operativ Media" }],
  creator: "Operativ Media",
  publisher: "Operativ Media",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://operativmedia.az'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'az_AZ',
    url: 'https://operativmedia.az',
    title: 'Operativ Media - Azərbaycanın ən etibarlı xəbər portalı',
    description: 'Azərbaycanın ən etibarlı xəbər portalı. Son xəbərlər, siyasət, iqtisadiyyat, idman, mədəniyyət və daha çox sahədə ən aktual məlumatlar.',
    siteName: 'Operativ Media',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Operativ Media - Xəbər Portalı',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Operativ Media - Azərbaycanın ən etibarlı xəbər portalı',
    description: 'Azərbaycanın ən etibarlı xəbər portalı. Son xəbərlər, siyasət, iqtisadiyyat, idman, mədəniyyət və daha çox sahədə ən aktual məlumatlar.',
    images: ['/og-image.jpg'],
    creator: '@operativmedia',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="az">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
