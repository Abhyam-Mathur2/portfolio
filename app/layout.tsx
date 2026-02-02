import type { Metadata } from "next";
import { Inter, Shojumaru, Sawarabi_Mincho } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import ParticlesBackground from "@/components/ParticlesBackground";
import InkBackground from "@/components/InkBackground";
import SakuraRain from "@/components/SakuraRain";
import ToriiLandscape from "@/components/ToriiLandscape";
import SlashPreloader from "@/components/SlashPreloader";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const shojumaru = Shojumaru({ weight: "400", subsets: ["latin"], variable: "--font-shojumaru" });
const sawarabi = Sawarabi_Mincho({ weight: "400", subsets: ["latin"], variable: "--font-sawarabi" });
const haruto = localFont({ src: "./fonts/Haruto-Personal-Use.ttf", variable: "--font-haruto" });

export const metadata: Metadata = {
  title: "Abhyam Mathur | The Code Ronin",
  description: "Full Stack Developer Portfolio - Forging Digital Solutions with Code and Creativity.",
  keywords: ["Web Developer", "Full Stack", "React", "Next.js", "Portfolio", "Samurai", "Code Ronin", "Frontend", "Backend"],
  authors: [{ name: "Abhyam Mathur" }],
  creator: "Abhyam Mathur",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://samurai-portfolio.vercel.app", // Fallback/Example URL
    title: "Abhyam Mathur | The Code Ronin",
    description: "Forging Digital Solutions - A Samurai Themed Developer Portfolio.",
    siteName: "Abhyam Mathur Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhyam Mathur | The Code Ronin",
    description: "Full Stack Developer Portfolio - Forging Digital Solutions.",
    creator: "@yourhandle", // Placeholder
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${shojumaru.variable} ${sawarabi.variable} ${haruto.variable} font-sans bg-[#0a0a0a] text-gray-200 antialiased overflow-x-hidden`}
      >
        <SlashPreloader />
        <CustomCursor />
        <ParticlesBackground />
        <InkBackground />
        <ToriiLandscape />
        <SakuraRain />
        {children}
      </body>
    </html>
  );
}
