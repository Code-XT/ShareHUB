import { Inter } from "next/font/google";
import "./globals.css";
import RedirectBar from "@/RedirectBar";
import { SocketProvider } from "@/SocketContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ShareHUB",
  description:
    "Effortlessly share files, links, and messages with end-to-end encryption.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center justify-between">
          <h1 className="text-6xl font-bold pt-11">
            Share<span className="text-blue-500 text-7xl">HUB</span>
          </h1>
          <SocketProvider>
            <RedirectBar />
            {children}
          </SocketProvider>
          <footer className="h-24 w-full text-center mt-8">
            &copy; 2024 By{" "}
            <a
              target="_blank"
              href="https://github.com/Code-XT"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              CodeX
            </a>
          </footer>
        </main>
      </body>
    </html>
  );
}
