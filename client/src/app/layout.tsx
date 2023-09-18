import ReduxProvider from '@/redux/Provider';
import './globals.css'
import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';

const fig = Figtree({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Music: All you need',
  description: 'music streaming app designed for web',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={fig.className}>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
