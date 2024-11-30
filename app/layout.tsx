import type { Metadata } from "next";
import { Roboto } from 'next/font/google'
import "./globals.css";
import portfolioPicture from "./assets/intro/portfolio-picture.webp";

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Resume - Cody Maness",
  description: "Resume website for Cody Maness, a Web and Mobile Software Developer with a passion for building accessible, elegant, and robust digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.className}>
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />

        <meta property="og:type" content="website" />
        <meta property="og:image" content={portfolioPicture.src} />
      </head>

      <body>
        { children }
      </body>
    </html>
  );
}
