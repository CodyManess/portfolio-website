import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import PortfolioAppBar from '@/components/nav/app-bar'
import BottomNav from '@/components/nav/bottom-nav'
import Footer from '@/components/nav/footer'
import { cn } from '@/lib/utils'

const inter = localFont({
  src: './fonts/inter-latin-wght-normal.woff2',
  weight: '100 900',
  style: 'normal',
  display: 'swap',
  variable: '--font-sans',
})

const robotoMono = localFont({
  src: './fonts/roboto-mono-latin-wght-normal.woff2',
  weight: '100 700',
  style: 'normal',
  display: 'swap',
  variable: '--font-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://codymaness.com'),
  alternates: {
    canonical: '/',
  },
  title: 'Cody Maness | Full-Stack Developer',
  description:
    'Full-Stack Web & Mobile Developer building accessible, scalable, and engaging digital experiences.',
  openGraph: {
    title: 'Cody Maness | Full-Stack Developer',
    description:
      'Full-Stack Web & Mobile Developer building accessible, scalable, and engaging digital experiences.',
    siteName: 'Cody Maness | Full-Stack Developer',
    locale: 'en_US',
    type: 'website',
    url: 'https://codymaness.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cody Maness | Full-Stack Developer',
    description:
      'Full-Stack Web & Mobile Developer building accessible, scalable, and engaging digital experiences.',
    images: ['/opengraph-image'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={cn('font-sans', inter.variable, robotoMono.variable)}
    >
      <body className={cn(inter.className, 'font-sans antialiased')}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-1300 focus:rounded-lg focus:bg-(--primary-color) focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <PortfolioAppBar />
        {children}
        <Footer />
        <BottomNav />
      </body>
    </html>
  )
}
