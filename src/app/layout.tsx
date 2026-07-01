import type { Metadata, Viewport } from 'next';
import { fontVariables } from '@/theme/fonts';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? process.env.URL ?? 'http://localhost:3000',
  ),
  title: 'UFIT Training | Train Smarter. Progress Every Workout.',
  description:
    'Build your own training program, track every workout, and let UFIT automatically manage your progression so you always know what to lift next.',
  icons: {
    icon: [{ url: '/favicon.png', sizes: '32x32', type: 'image/png' }],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: 'UFIT Training | Train Smarter. Progress Every Workout.',
    description:
      'Build your own training program, track every workout, and let UFIT automatically manage your progression so you always know what to lift next.',
    type: 'website',
    images: [{ url: '/images/icon.png', width: 512, height: 512, alt: 'UFIT Training' }],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white font-body text-gray-900">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
