import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ReduxProvider from "../redux/provider";
import { Setup } from "@/components/utils";
import { GoogleMapsProvider } from "@/providers/GoogleMapsProvider"; // 👈 import it
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FractalShare",
  description: "Fractional investment on land",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased text-newblack`}>
        <ReduxProvider>
          <GoogleMapsProvider>
            <Setup />
            {children}
          </GoogleMapsProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
