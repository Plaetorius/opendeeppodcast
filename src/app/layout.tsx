import type { Metadata } from "next";
import "./globals.css";
import Providers from "ui/providers/Providers";
import Header from "ui/Header";

export const metadata: Metadata = {
  title: "OpenDeepPodcast",
  description: "AI Generated, Deeply Researched Podcasts, for free, for everyone.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Providers>
          <div className="min-h-screen relative m-0">
            {/* True angular/conic gradient background */}
            <div className="fixed inset-0 bg-gradient-to-br from-[#FB575B] via-[#FB575B] to-[#8E52FC]" />

            
            {/* Your content */}
            <div className="relative p-4 w-screen flex flex-col items-center justify-center">
              <Header />
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
