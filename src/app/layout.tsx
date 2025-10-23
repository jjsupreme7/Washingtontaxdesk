import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WashingtonTaxDesk.com - Professional Washington State Tax Solutions',
  description: 'Expert Washington State tax guidance for individuals, businesses, accounting firms, and law firms. AI-powered assistance with real-time WA DOR data.',
  keywords: 'Washington tax, WA DOR, tax compliance, B&O tax, sales tax, accounting firms, law firms, enterprise tax solutions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
