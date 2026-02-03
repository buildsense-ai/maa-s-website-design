import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono, Sora, Source_Sans_3 } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/lib/i18n/language-context'

const _geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const _geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const _sourceSans3 = Source_Sans_3({ subsets: ["latin"], variable: "--font-source-sans-3" });
const _sora = Sora({ subsets: ["latin"], variable: "--font-sora" });

export const metadata: Metadata = {
  title: 'GauzMem | Memory as a Service for AI Agents',
  description: 'The memory layer engineered for Association and Forgetting. Transform sparse inputs into precise context—eliminating the noise that scales with time.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${_geist.variable} ${_geistMono.variable} ${_sourceSans3.variable} ${_sora.variable} font-sans antialiased`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
