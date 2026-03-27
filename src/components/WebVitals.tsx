"use client";

import { useEffect } from "react";

export function WebVitals() {
  useEffect(() => {
    if (typeof window === "undefined" || !("PerformanceObserver" in window)) return;

    const report = (name: string, value: number) => {
      if ("gtag" in window) {
        const gtag = (window as unknown as { gtag: (...args: unknown[]) => void }).gtag;
        gtag("event", name, {
          event_category: "Web Vitals",
          value: Math.round(name === "CLS" ? value * 1000 : value),
          non_interaction: true,
        });
      }
    };

    try {
      new PerformanceObserver((list) => {
        const e = list.getEntries();
        if (e.length) report("LCP", e[e.length - 1].startTime);
      }).observe({ type: "largest-contentful-paint", buffered: true });
    } catch {}

    try {
      let cls = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as PerformanceEntry & { hadRecentInput?: boolean }).hadRecentInput)
            cls += (entry as PerformanceEntry & { value?: number }).value || 0;
        }
      }).observe({ type: "layout-shift", buffered: true });
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") report("CLS", cls);
      });
    } catch {}

    try {
      new PerformanceObserver((list) => {
        const fcp = list.getEntries().find((e) => e.name === "first-contentful-paint");
        if (fcp) report("FCP", fcp.startTime);
      }).observe({ type: "paint", buffered: true });
    } catch {}

    try {
      let maxINP = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const d = (entry as PerformanceEntry & { duration: number }).duration;
          if (d > maxINP) maxINP = d;
        }
      }).observe({ type: "event", buffered: true } as PerformanceObserverInit);
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden" && maxINP > 0) report("INP", maxINP);
      });
    } catch {}
  }, []);

  return null;
}
