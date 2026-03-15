import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Interest Badge",
  description: "Show your interests on Twitter",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#f5f0e8] dark:bg-[#1a1a1a] text-[#1a1a1a] dark:text-[#f5f0e8] min-h-screen">
        {children}
      </body>
    </html>
  );
}
