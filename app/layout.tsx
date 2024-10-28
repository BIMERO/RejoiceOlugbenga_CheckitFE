import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Providers from "@/redux/Providers";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "SpaceX",
  description: "Taking your to space and beyond",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body>
          <Navbar />
          {children}
          <Footer />
        </body>
      </Providers>
    </html>
  );
}
