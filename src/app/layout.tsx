import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/providers/ToastProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AIAssistant from "@/components/ui/AIAssistant";
import CustomCursor from "@/components/ui/CustomCursor";
import LenisProvider from "@/components/providers/LenisProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GigtechOrbit - AI Automation & Modern Dev",
  description: "Elite AI automation and software development collective.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} antialiased bg-black text-white min-h-screen flex flex-col cursor-none`}
      >
        <CustomCursor />
        <ToastProvider />
        <LenisProvider>
          <Navbar />
          <main className="flex-grow pt-20">{children}</main>
          <AIAssistant />
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
