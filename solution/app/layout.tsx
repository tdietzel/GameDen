import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Game Den Retreat",
  description: "An engaging online platform where users can enjoy multiplayer games, interact with each other and track their progress through leaderboards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US">
      <body className={inter.className}>{children}</body>
    </html>
  );
}