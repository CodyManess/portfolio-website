import type { Metadata } from "next";
import { Roboto } from 'next/font/google'
import "./globals.css";

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Resume - Cody Maness",
  description: "Resume website for Cody Maness, a Web and Mobile Software Developer with a passion for building accessible, elegant, and robust digital experiences.",
  openGraph: {
    title: "Resume - Cody Maness",
    description: "Resume website for Cody Maness",
    images: "https://portfolio-website--plucky-portal-443303-i2.us-central1.hosted.app/portfolio-picture.webp",
  }
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
      </head>

      <body>
        { children }
      </body>
    </html>
  );
}
