/**
 * Next.js App Router navigation helpers.
 * Replaces the old hash-based client-side router with idiomatic
 * `next/navigation` routing.
 */
'use client';

import { useRouter, usePathname } from 'next/navigation';

export interface AppNavigation {
  router: ReturnType<typeof useRouter>;
  pathname: string;
  navigateTo: (path: string) => void;
  goHome: () => void;
  goToSection: (section: string) => void;
}

export function useAppNavigation(): AppNavigation {
  const router = useRouter();
  const pathname = usePathname();

  const navigateTo = (path: string) => {
    router.push(path);
  };

  const goHome = () => {
    router.push('/');
  };

  // Scroll to a home-page section; navigate home first if not already there.
  const goToSection = (section: string) => {
    if (pathname === '/') {
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(`/?section=${section}#${section}`);
    }
  };

  return { router, pathname, navigateTo, goHome, goToSection };
}
