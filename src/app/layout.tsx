import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/provider/ModalProvider";
import { Toaster } from "sonner";
import Header from "@/components/Header";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LucaNotion",
  description: "An app develope for a job opportunity in Ensure",
  icons: [
    {
      url: "/Free_Sample_By_Wix.jpg",
      href: "/Free_Sample_By_Wix.jpg",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Toaster />
        <ModalProvider />
        <body className={cn("", inter.className)}>
          <Header>{children}</Header>
        </body>
      </html>
    </ClerkProvider>
  );
}
