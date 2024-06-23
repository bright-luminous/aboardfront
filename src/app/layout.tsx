import { Inter } from "next/font/google";
import type { Metadata } from "next";
import './globals.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "aBoard",
  description: "for Datawow",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} items-start justify-between`}>
        {children}
      </body>
    </html>
  );
}
