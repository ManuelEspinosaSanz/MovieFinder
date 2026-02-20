import React from "react"
import type { Metadata } from 'next'
import { Cormorant_Garamond, Work_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ['300', '400', '600'],
  variable: '--font-cormorant',
})

const _workSans = Work_Sans({ 
  subsets: ["latin"],
  weight: ['300', '400', '500'],
  variable: '--font-work-sans',
})

export const metadata: Metadata = {
  title: 'MovieFinder - Cartelera Contemporánea',
  description: 'Descubre las mejores películas: populares, en cartelera, próximos estrenos y las mejor valoradas.',
  icons: {
    icon: [
      {
        url: '/icon.png',
        type: 'image/png',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
