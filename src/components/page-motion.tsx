"use client";

import { useEffect } from "react";
import { useAnimate } from "motion/react-mini";

export function PageMotion({ children }: { children: React.ReactNode }) {
  const [scope, animate] = useAnimate<HTMLDivElement>();

  useEffect(() => {
    const container = scope.current;
    if (!container || !window.matchMedia || !window.IntersectionObserver || !Element.prototype.animate) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) return;
    const root = document.documentElement;
    const tokens = getComputedStyle(root);
    const durationToken = tokens.getPropertyValue("--entrance-duration").trim();
    const duration = parseFloat(durationToken) / (durationToken.endsWith("ms") ? 1000 : 1);
    const distance = parseFloat(tokens.getPropertyValue("--entrance-distance"));
    const opacity = Number(tokens.getPropertyValue("--entrance-opacity"));
    if (!Number.isFinite(duration) || duration <= 0 || !Number.isFinite(distance)) return;

    type Entry = {
      from: { opacity: number; transform: string };
      reset: () => void;
      duration: number;
      control?: ReturnType<typeof animate>;
      timeout?: ReturnType<typeof setTimeout>;
    };
    const entries = new Map<HTMLElement, Entry>();
    let ready = false;

    const settle = (element: HTMLElement) => {
      const entry = entries.get(element);
      if (!entry) return;
      entries.delete(element);
      observer.unobserve(element);
      clearTimeout(entry.timeout);
      entry.control?.cancel();
      entry.reset();
    };
    const settleAll = () => Array.from(entries.keys()).forEach(settle);
    const enter = (element: HTMLElement) => {
      const entry = entries.get(element);
      if (!entry || entry.control || !ready || document.hidden) return;
      if (preference.matches || element.contains(document.activeElement)) {
        settle(element);
        return;
      }
      observer.unobserve(element);
      try {
        entry.control = animate(element, {
          opacity: [entry.from.opacity, 1],
          transform: [entry.from.transform, "none"],
        }, { duration: entry.duration, ease: [.25, .1, .25, 1] });
        entry.timeout = setTimeout(() => settle(element), entry.duration * 1000 + 200);
        void entry.control.then(() => settle(element), () => settle(element));
      } catch {
        settle(element);
      }
    };
    // The prepared first frame is transparent; reveal after reaching the viewport edge.
    const observer = new IntersectionObserver((changes) => {
      for (const change of changes) if (change.isIntersecting) enter(change.target as HTMLElement);
    }, { rootMargin: "0px 0px -24px 0px", threshold: 0 });

    const start = () => {
      if (ready || root.dataset.opening === "active") return;
      ready = true;
      for (const element of entries.keys()) observer.observe(element);
    };
    const opening = new MutationObserver(start);
    opening.observe(root, { attributes: true, attributeFilter: ["data-opening"] });

    const onInteraction = (event: Event) => {
      if (!(event.target instanceof Node)) return;
      // Native section focus must not consume every later card in that section.
      for (const element of entries.keys()) if (element.contains(event.target)) settle(element);
    };
    const onPreference = () => { if (preference.matches) settleAll(); };
    const onVisibility = () => {
      if (document.hidden) {
        for (const [element, entry] of entries) if (entry.control) settle(element);
      } else if (ready) {
        for (const element of entries.keys()) {
          observer.unobserve(element);
          observer.observe(element);
        }
      }
    };
    container.addEventListener("focusin", onInteraction);
    container.addEventListener("pointerdown", onInteraction);
    document.addEventListener("visibilitychange", onVisibility);
    preference.addEventListener("change", onPreference);

    const covered = root.dataset.opening === "active";
    for (const element of container.querySelectorAll<HTMLElement>("[data-enter]")) {
      const rect = element.getBoundingClientRect();
      const visible = rect.top < innerHeight && rect.bottom > 0 && rect.left < innerWidth && rect.right > 0;
      // Restored/already painted content stays still. Offscreen content is prepared first.
      if ((!covered && visible) || element.contains(document.activeElement)) continue;
      const kind = element.dataset.enter;
      if (!["fade", "rise", "image", "portrait"].includes(kind ?? "")) continue;
      const hero = Boolean(element.closest("#intro"));
      const offset = hero ? Math.min(distance, 16) : distance;
      const from = {
        opacity,
        transform: kind === "fade" ? "none" : `translateY(${offset}px)`,
      };
      const previous = { opacity: element.style.opacity, transform: element.style.transform };
      entries.set(element, {
        from,
        reset: () => Object.assign(element.style, previous),
        duration: hero ? Math.min(duration, .75) : duration,
      });
      Object.assign(element.style, { opacity: String(from.opacity), transform: from.transform });
    }
    start();

    return () => {
      observer.disconnect();
      opening.disconnect();
      settleAll();
      container.removeEventListener("focusin", onInteraction);
      container.removeEventListener("pointerdown", onInteraction);
      document.removeEventListener("visibilitychange", onVisibility);
      preference.removeEventListener("change", onPreference);
    };
  }, [animate, scope]);

  return <div id="portfolio-content" ref={scope}>{children}</div>;
}
