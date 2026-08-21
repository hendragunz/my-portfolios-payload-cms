/**
 * Google Analytics (gtag.js) Integration
 * Retrieves the Measurement ID / Tracking Key dynamically from the GOOGLE_ANALYTIC_KEY secret.
 */

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export function getGoogleAnalyticKey(): string {
  const key = 
    (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_GOOGLE_ANALYTIC_KEY) ||
    (typeof process !== 'undefined' && process.env?.GOOGLE_ANALYTIC_KEY) ||
    (typeof window !== 'undefined' && (window as any).__GOOGLE_ANALYTIC_KEY__) ||
    '';
  return typeof key === 'string' ? key.trim() : '';
}

let isInitialized = false;

export function initGoogleAnalytics(): void {
  if (typeof window === 'undefined' || isInitialized) return;

  const trackingId = getGoogleAnalyticKey();
  if (!trackingId) {
    console.info('[Google Analytics] GOOGLE_ANALYTIC_KEY secret is not set. Analytics initialization skipped.');
    return;
  }

  // Ensure dataLayer exists
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function () {
      window.dataLayer?.push(arguments);
    };
  }

  window.gtag('js', new Date());
  window.gtag('config', trackingId, {
    send_page_view: true,
    page_path: window.location.pathname + window.location.hash,
  });

  // Inject script tag if not already injected
  const scriptId = 'google-analytics-gtag';
  if (!document.getElementById(scriptId)) {
    const script = document.createElement('script');
    script.id = scriptId;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(trackingId)}`;
    document.head.appendChild(script);
  }

  isInitialized = true;
  console.info(`[Google Analytics] Initialized successfully with key.`);
}

export function trackPageView(url?: string, title?: string): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  const trackingId = getGoogleAnalyticKey();
  if (!trackingId) return;

  const pagePath = url || (window.location.pathname + window.location.hash);
  const pageTitle = title || document.title;

  window.gtag('event', 'page_view', {
    page_path: pagePath,
    page_title: pageTitle,
    page_location: window.location.href,
  });
}

export function trackEvent(
  action: string, 
  params?: Record<string, any>
): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  const trackingId = getGoogleAnalyticKey();
  if (!trackingId) return;

  window.gtag('event', action, params || {});
}
