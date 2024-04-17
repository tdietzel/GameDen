import { AuthProvider } from "./Providers";
import "./globals.css";

export const metadata = {
  title: "Game Den Retreat",
  description: "An engaging online platform where users can enjoy multiplayer games, interact with each other and track their progress through leaderboards.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-US">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}