import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Harshal Chavan ",
  description: "Personal site and blog of Harshal Chavan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Harshal Chavan</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-ctp-base text-ctp-text p-4`}
      >
          <Navbar />
        {children}
      <Footer />
      </body>
    </html>
  );
}
