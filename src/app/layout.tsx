import type { Metadata } from 'next'
import { Inter, Roboto_Mono } from 'next/font/google'
import './globals.css'
import PortfolioAppBar from '@/components/nav/app-bar'
import BottomNav from '@/components/nav/bottom-nav'
import Footer from '@/components/nav/footer'
import { cn } from '@/lib/utils'

const inter = Inter({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const robotoMono = Roboto_Mono({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
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
        <PortfolioAppBar />
        {children}
        <Footer />
        <BottomNav />
      </body>
    </html>
  )
}
