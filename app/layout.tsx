import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SiteFooter from '@/components/layout/SiteFooter'
import AppProviders from '@/components/layout/AppProviders'
import { Analytics } from '@vercel/analytics/next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'India Climate-Tech Map',
  description:
    "Interactive analysis of India's climate-tech investment landscape: funding rounds, investor map, whitespace heatmap, graduation funnel, and research corpus. Built by Arman Ghosh.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-zinc-950 text-zinc-100`}>
        <AppProviders>
          {children}
          <SiteFooter />
        </AppProviders>
        <Analytics />
      </body>
    </html>
  )
}
