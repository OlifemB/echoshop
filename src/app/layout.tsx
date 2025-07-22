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
    <style>
      {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          body {
            font-family: 'Inter', sans-serif;
          }
          .ant-card-actions > li > span {
            width: 100%;
          }
          .ant-card-actions button {
            width: 100%;
          }
        `}
    </style>
    <AntdRegistry>
      {children}
    </AntdRegistry>
    </body>
    </html>
  )
}