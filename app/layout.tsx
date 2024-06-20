import { cn } from '@/lib/utils'
import { Inter as FontSans } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'
import type { Metadata } from "next"
import { cookies } from 'next/headers'

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Facilita Diário"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const theme = cookies().get('theme')?.value

  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased overflow-x-hidden transition-colors",
          fontSans.variable,
          theme === 'light' ? 'light' : 'dark'
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  )
}