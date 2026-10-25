import ConfirmProvider from "@components/confirm/context";
import CookieConsent from "@components/cookieConsent";
import MessageProvider from "@components/toast/context";
import AuthProvider from "@context/auth";
import "animate.css/animate.min.css";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import "../styles/globals.css";

import Analytics from "../components/analytics";

// const Analytics = dynamic(() => import("../components/analytics"), {
//   ssr: false,
// });
const APP_NAME = "Karen Community SDA Giving";
const APP_DEFAULT_TITLE = "Give Online | Karen Community SDA";
const APP_TITLE_TEMPLATE = "%s";
const APP_DESCRIPTION =
  "Secure online giving for Karen Community Seventh-day Adventist Church.";
export const metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: "Secure online giving for Karen Community Seventh-day Adventist Church.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    url: "https://www.sdackc.org",
    siteName: APP_NAME,
    images: [
      {
        url: "/church.png",
        width: 800,
        height: 400,
      },
      {
        url: "/global-logo.svg",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      new URL("/favicon.ico", "https://www.sdackc.org"),
      { url: "/favicon.svg", rel: "icon", type: "image/svg+xml" },
      { url: "/favicon.png", rel: "icon", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      { url: "/favicon.ico" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-256x256.png", sizes: "256x256", type: "image/png" },
      { url: "/icon-384x384.png", sizes: "384x384", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/favicon.ico",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en">
        <body className="relative transition-all scroll-smooth bg-slate-50">
          <Analytics />
          <Suspense></Suspense>
          <MessageProvider>
            <ConfirmProvider>
              <AuthProvider>{children}</AuthProvider>
            </ConfirmProvider>
          </MessageProvider>
          <CookieConsent />
        </body>
      </html>
    </>
  );
}
