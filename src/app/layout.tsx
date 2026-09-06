import type { Metadata } from 'next';
import { Cormorant_Garamond, Libre_Baskerville, Caveat, Inter } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
});

const libre = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-libre',
});

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-caveat',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Jasira Veyra — A Quiet Soul in a Loud World',
  description: 'An interactive journey through the world of Jasira Veyra, where flowers remember, stories disappear, and quiet magic begins to bloom.',
  keywords: ['Jasira Veyra', 'Bloomverse', 'Interactive Story', 'Fantasy', 'Webcomic'],
  authors: [{ name: 'Creator' }],
  creator: 'Creator',
  openGraph: {
    title: 'Jasira Veyra — A Quiet Soul in a Loud World',
    description: 'An interactive journey through the world of Jasira Veyra, where flowers remember, stories disappear, and quiet magic begins to bloom.',
    siteName: 'Jasira Veyra',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

import Navbar from '@/components/layout/Navbar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${libre.variable} ${caveat.variable} ${inter.variable}`}>
      <body className="min-h-screen antialiased bg-midnight text-cream">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
