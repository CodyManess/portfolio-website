import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import PortfolioAppBar from '@/components/layout/app-bar'
import BottomNav from '@/components/layout/bottom-nav'
import Footer from '@/components/layout/footer'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

const inter = localFont({
  src: './fonts/inter-latin-wght-normal.woff2',
  weight: '100 900',
  style: 'normal',
  display: 'swap',
  variable: '--font-inter',
})

const robotoMono = localFont({
  src: './fonts/roboto-mono-latin-wght-normal.woff2',
  weight: '100 700',
  style: 'normal',
  display: 'swap',
  variable: '--font-roboto-mono',
})

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#007ab8' },
    { media: '(prefers-color-scheme: dark)', color: '#020617' },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: '/',
  },
  title: siteConfig.title,
  description: siteConfig.description,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  keywords: [...siteConfig.knowsAbout],
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    locale: 'en_US',
    type: 'website',
    url: siteConfig.url,
    images: [
      {
        url: siteConfig.ogImagePath,
        width: 1200,
        height: 630,
        alt: `Profile of ${siteConfig.name}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImagePath],
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
      <body className="font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-1300 focus:rounded-lg focus:bg-(--primary-color) focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-(--primary-color) focus:outline-none"
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
