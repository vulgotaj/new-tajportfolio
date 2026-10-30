"use client";

import { useEffect, useRef, useState } from "react";
import { useAnimate } from "motion/react-mini";
import { BsPause, BsPlay } from "react-icons/bs";
import type { StaticImageData } from "next/image";
import type { Dictionary } from "@/i18n/dictionaries";
import lightField from "../../public/decoration/particles-field-light.svg";
import darkField from "../../public/decoration/particles-field-dark.svg";

// Static imports change the resource URL with its contents, including during Fast Refresh.
const fields: { light: StaticImageData; dark: StaticImageData } = { light: lightField, dark: darkField };

const depths = [
  { id: "far", duration: 32, x: 8, y: -6 },
  { id: "mid", duration: 28, x: -12, y: 10 },
  { id: "near", duration: 24, x: 16, y: -12 },
] as const;

export function HeroParticles({ copy }: { copy: Dictionary["hero"]["particles"] }) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  const synchronize = useRef<(() => void) | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const container = scope.current;
    const button = buttonRef.current;
    if (!container || !button || !Element.prototype.animate || !window.IntersectionObserver || !window.matchMedia) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    let controls: ReturnType<typeof animate>[] = [];
    const layers = Array.from(container.querySelectorAll<HTMLElement>(".hero-particle-layer"));

    const update = () => {
      if (reducedMotion.matches) {
        controls.forEach((control) => control.cancel());
        controls = [];
        return;
      }
      const shouldPlay = inView && !document.hidden && !pausedRef.current;
      if (shouldPlay && !controls.length) {
        controls = layers.map((layer, index) => {
          const { x, y, duration } = depths[index]!;
          return animate(layer, {
            transform: ["translate(0px, 0px)", `translate(${x}px, ${y}px)`, `translate(${-x}px, ${-y}px)`, "translate(0px, 0px)"],
          }, { duration, repeat: Infinity, ease: "easeInOut" });
        });
      }
      controls.forEach((control) => shouldPlay ? control.play() : control.pause());
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry?.isIntersecting ?? false;
      update();
    });
    observer.observe(container);
    reducedMotion.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    synchronize.current = update;
    button.dataset.ready = "true";

    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
      controls.forEach((control) => control.cancel());
      synchronize.current = null;
      delete button.dataset.ready;
    };
  }, [animate, scope]);

  const action = paused ? copy.resume : copy.pause;
  const Icon = paused ? BsPlay : BsPause;
  return (
    <>
      <div ref={scope} className="hero-particles" aria-hidden="true">
        {depths.map(({ id }) => (
          <div key={id} className="hero-particle-layer" data-depth={id}>
            <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" focusable="false">
              <use className="particle-light" href={`${fields.light.src}#particles-${id}`} />
              <use className="particle-dark" href={`${fields.dark.src}#particles-${id}`} />
            </svg>
          </div>
        ))}
      </div>
      <button ref={buttonRef} type="button" className="settings-trigger particle-toggle" aria-label={action} title={action}
        onClick={() => {
          pausedRef.current = !pausedRef.current;
          setPaused(pausedRef.current);
          synchronize.current?.();
        }}>
        <Icon size={20} aria-hidden="true" focusable="false" />
      </button>
    </>
  );
}
