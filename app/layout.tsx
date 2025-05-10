import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ClarityFlow",
  description: "Earn your way to clarity",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#00CDEC",
          colorText: "#ffffff",
          colorBackground: "#09111c",
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={`${roboto.variable} antialiased flex flex-col h-full`}>
          <ThemeProvider attribute="class" defaultTheme="dark">
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
