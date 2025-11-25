import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import PortfolioAppBar from '@/shared/components/Nav/AppBar/appbar'
import BottomNav from '@/shared/components/Nav/BottomNav/bottomNav'
import Footer from '@/shared/components/Nav/Footer/footer'
import ThemeRegistry from './ThemeRegistry'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://codymaness.com'),
  title: 'Cody Maness | Full-Stack Developer',
  description:
    'Resume website for Cody Maness, a Full-Stack Web and Mobile Software Developer with a passion for building accessible, elegant, and robust digital experiences.',
  openGraph: {
    title: 'Cody Maness | Full-Stack Developer',
    description:
      'Resume website for Cody Maness, a Full-Stack Web and Mobile Software Developer with a passion for building accessible, elegant, and robust digital experiences.',
    siteName: 'Cody Maness | Full-Stack Developer',
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
    <html lang="en">
      <body className={roboto.className}>
        <ThemeRegistry>
          <PortfolioAppBar />
          {children}
          <Footer />
          <BottomNav />
        </ThemeRegistry>
      </body>
    </html>
  )
}
