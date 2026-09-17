/**
 * Report page views to Google Analytics on client-side navigation.
 *
 * GA4's own snippet fires a view when the document loads. This is a single-page
 * app, so every route after the first changes the URL without a reload and
 * would otherwise go uncounted, making the homepage look like the only page
 * anyone visits. The snippet in index.html therefore sets send_page_view:false
 * and views are sent from here instead, including the first one.
 */
import { useEffect } from "react";
import { useLocation } from "wouter";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    MUONS_GA_ID?: string;
  }
}

export function usePageViews() {
  const [location] = useLocation();

  useEffect(() => {
    if (typeof window.gtag !== "function") return;
    window.gtag("event", "page_view", {
      page_path: location,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location]);
}
