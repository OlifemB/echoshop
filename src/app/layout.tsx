import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AntdRegistry } from '@ant-design/nextjs-registry'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Магазин',
  description: 'Интернет-магазин на Next.js'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
    <body className={inter.className}>
    <AntdRegistry>{children}</AntdRegistry>
    </body>
    </html>
  )
}