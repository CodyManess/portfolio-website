import type { Metadata } from 'next'
import './globals.css'
import PortfolioAppBar from '@/shared/components/Nav/AppBar/appbar'
import BottomNav from '@/shared/components/Nav/BottomNav/bottomNav'
import Footer from '@/shared/components/Nav/Footer/footer'
import ThemeRegistry from './ThemeRegistry'

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
      <body>
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
