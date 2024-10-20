import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Resume - Cody Maness",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>

      <body>{ children }</body>
    </html>
  );
}
