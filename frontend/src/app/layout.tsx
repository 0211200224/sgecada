import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

import { AuthProvider } from "@/context/auth-context";

export const metadata: Metadata = {
  title: "SGE-ERP | Sistema de Gestão Escolar",
  description: "Plataforma premium de gestão escolar analítica e multi-tenant.",
};

import { RootProvider } from "@/components/providers/root-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-PT" className={`${outfit.variable} h-full dark`}>
      <body className="min-h-full flex flex-col font-sans">
        <RootProvider>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
