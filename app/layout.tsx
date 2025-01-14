import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://codymaness.com'),
  title: 'Cody Maness | Web & Mobile Developer',
  description:
    'Resume website for Cody Maness, a Web and Mobile Software Developer with a passion for building accessible, elegant, and robust digital experiences.',
  openGraph: {
    title: 'Cody Maness | Web & Mobile Developer',
    description:
      'Resume website for Cody Maness, a Web and Mobile Software Developer with a passion for building accessible, elegant, and robust digital experiences.',
    siteName: 'Cody Maness | Web & Mobile Developer',
    locale: 'en_US',
    type: 'website',
    url: 'https://codymaness.com',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={roboto.className}>
      <body>{children}</body>
    </html>
  )
}
