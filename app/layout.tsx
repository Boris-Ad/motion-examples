import type { Metadata } from 'next';
import { Montserrat, Roboto, Geist } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { Sidebar } from '@/components/Sidebar';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['cyrillic'],
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['cyrillic'],
});

export const metadata: Metadata = {
  title: 'Example',
  description: 'Motion Components',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${roboto.variable} ${montserrat.variable} ${geistSans.variable} antialiased 2xl:grid 2xl:grid-cols-[auto_1fr] 2xl:grid-rows-[auto_1fr]`}
      >
        <div className="2xl:hidden absolute inset-0 flex justify-center items-center">
          <h1 className="text-2xl">Пока только desktop от 1536px</h1>
        </div>
        <ThemeProvider attribute="class" enableSystem={false}>
          <Sidebar />
          <Navbar />
          <main className="hidden 2xl:block min-h-full overflow-y-auto relative row-start-2 bg-background transition-theme">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
