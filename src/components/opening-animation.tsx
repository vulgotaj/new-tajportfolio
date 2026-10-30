"use client";

import { useEffect, useRef, useState } from "react";
import { useAnimate } from "motion/react";

const duration = 2.5;
// Stretch all phases together to preserve the approved sequence's rhythm.
const timingScale = duration / 1.48;
const revealAt = .92 * timingScale;
const expansion = { at: .16 * timingScale, duration: .54 * timingScale, ease: [.22, 1, .36, 1] as const };

export function OpeningAnimation({ children }: { children: React.ReactNode }) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const [finished, setFinished] = useState(false);
  const pendingDismiss = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    clearTimeout(pendingDismiss.current);
    let mounted = true;
    const root = document.documentElement;
    const content = document.getElementById("portfolio-content");
    let controls: ReturnType<typeof animate> | undefined;
    let revealTimer: ReturnType<typeof setTimeout> | undefined;
    let endTimer: ReturnType<typeof setTimeout> | undefined;
    const onEnd = () => {
      clearTimeout(revealTimer);
      clearTimeout(endTimer);
      controls?.cancel();
      setFinished(true);
    };
    const dismiss = () => { if (mounted) window.dispatchEvent(new Event("taj-opening-dismiss")); };
    window.addEventListener("taj-opening-end", onEnd);

    const elapsed = (performance.now() - Number(root.dataset.openingStarted)) / 1000;
    if (!root.dataset.opening || !scope.current || !content || !Number.isFinite(elapsed) || elapsed >= .5) {
      dismiss();
      onEnd();
    } else {
      // Visibility protects focus before hydration; inert protects it while the page fades in.
      content.inert = true;
      try {
        controls = animate([
          ["#syntax-open", { transform: ["translateX(39px)", "translateX(0px)"] }, expansion],
          ["#syntax-slash, #syntax-close", { transform: ["translateX(-39px)", "translateX(0px)"] }, expansion],
          ["#taj-letters", { opacity: [0, 1] }, { at: .28 * timingScale, duration: .42 * timingScale }],
          [scope.current, { opacity: [1, 0] }, { at: revealAt, duration: duration - revealAt }],
        ]);
        // Keep the compact first state even after hydration, within the original time budget.
        const remaining = duration - elapsed;
        controls.speed = duration / remaining;
        revealTimer = setTimeout(() => {
          if (root.dataset.opening) root.dataset.opening = "revealing";
        }, revealAt / duration * remaining * 1000);
        endTimer = setTimeout(dismiss, remaining * 1000);
        void controls.then(dismiss, dismiss);
      } catch {
        dismiss();
      }
    }

    return () => {
      mounted = false;
      clearTimeout(revealTimer);
      clearTimeout(endTimer);
      controls?.cancel();
      window.removeEventListener("taj-opening-end", onEnd);
      // React's development effect replay immediately cancels this pending cleanup.
      pendingDismiss.current = setTimeout(() => window.dispatchEvent(new Event("taj-opening-dismiss")), 0);
    };
  }, [animate, scope]);

  if (finished) return null;
  return <div ref={scope} className="site-opening" aria-hidden="true">{children}</div>;
}
