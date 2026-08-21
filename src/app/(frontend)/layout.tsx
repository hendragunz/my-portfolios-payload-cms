import type { Metadata } from 'next';
import { Suspense } from 'react';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { DataProvider } from '@/context/DataContext';
import { AnalyticsTracker } from '@/components/AnalyticsTracker';

export const metadata: Metadata = {
  title: 'Hendra Gunawan | Senior Ruby on Rails & Full-Stack Architect',
  description:
    'Portfolio of Hendra Gunawan, Senior Full-Stack Architect specializing in Ruby on Rails (10+ Years), SaaS, E-Commerce, REST/GraphQL APIs, Next.js, and Vue.js.',
  openGraph: {
    title: 'Hendra Gunawan | Senior Ruby on Rails & Full-Stack Architect',
    description:
      '10+ years architecting enterprise SaaS, E-Commerce platforms, high-concurrency APIs, and modern reactive web applications.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hendra Gunawan | Senior Ruby on Rails & Full-Stack Architect',
    description:
      '10+ years architecting enterprise SaaS, E-Commerce platforms, high-concurrency APIs, and modern reactive web applications.',
  },
};

// Applies the saved theme before hydration to prevent a flash of the wrong theme.
const themeInitScript = `(function(){try{var t=localStorage.getItem('portfolio_theme');if(t==='light'||t==='dark'){document.documentElement.classList.toggle('dark',t==='dark');}else if(window.matchMedia('(prefers-color-scheme: light)').matches){document.documentElement.classList.remove('dark');}else{document.documentElement.classList.add('dark');}}catch(e){document.documentElement.classList.add('dark');}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ThemeProvider>
          <DataProvider>{children}</DataProvider>
        </ThemeProvider>
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
      </body>
    </html>
  );
}
