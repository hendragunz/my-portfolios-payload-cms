'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { initGoogleAnalytics, trackPageView } from '@/utils/analytics';

/**
 * Client-side Google Analytics tracker.
 * Initializes gtag once and fires a page_view event on every route change.
 */
export function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    initGoogleAnalytics();
  }, []);

  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    trackPageView(url);
  }, [pathname, searchParams]);

  return null;
}
