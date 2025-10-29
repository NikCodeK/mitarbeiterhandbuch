import type { Metadata } from 'next';
import { Inter, Source_Sans_3 } from 'next/font/google';

import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { cn } from '@/lib/utils';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-alt',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Thierhoff Consulting – Mitarbeiterhandbuch',
  description:
    'Digitales Mitarbeiterhandbuch von Thierhoff Consulting mit Richtlinien, Abläufen und Best Practices für den Arbeitsalltag.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.variable,
          sourceSans.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
