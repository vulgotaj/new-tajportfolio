"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import type { Dictionary } from "@/i18n/dictionaries";

type Drag = { x: number; y: number; left: number; active: boolean };

function scrollTarget(list: HTMLUListElement, card: HTMLElement): number {
  const centered = getComputedStyle(card).scrollSnapAlign === "center";
  const origin = (list.firstElementChild as HTMLElement | null)?.offsetLeft ?? 0;
  const offset = centered ? card.offsetLeft - (list.clientWidth - card.offsetWidth) / 2 : card.offsetLeft - origin;
  return Math.max(0, Math.min(list.scrollWidth - list.clientWidth, offset));
}

export function ProjectCarousel({ ids, labels, children }: {
  ids: string[];
  labels: Dictionary["projects"];
  children: ReactNode;
}) {
  const track = useRef<HTMLUListElement>(null);
  const drag = useRef<Drag | null>(null);
  const userInteraction = useRef(false);
  const [state, setState] = useState({ index: 0, last: 0, previous: false, next: ids.length > 1, scrollable: ids.length > 1 });

  useEffect(() => {
    const list = track.current;
    if (!list) return;
    let timer: ReturnType<typeof setTimeout>;
    const update = () => {
      const maximum = Math.max(0, list.scrollWidth - list.clientWidth);
      const cards = Array.from(list.children) as HTMLElement[];
      const targets = cards.map((card) => scrollTarget(list, card));
      const index = targets.reduce((nearest, target, i) => {
        const distance = Math.abs(target - list.scrollLeft);
        const nearestDistance = Math.abs(targets[nearest]! - list.scrollLeft);
        return distance < nearestDistance ? i : nearest;
      }, 0);
      const last = cards.reduce((visible, card, i) => card.offsetLeft + card.offsetWidth <= list.scrollLeft + list.clientWidth + 2 ? i : visible, index);
      setState({ index, last, previous: list.scrollLeft > 2, next: list.scrollLeft < maximum - 2, scrollable: maximum > 2 });
      clearTimeout(timer);
      if (userInteraction.current && ids[index]) {
        timer = setTimeout(() => {
          const destination = new URL(window.location.href);
          destination.hash = `project-${ids[index]}`;
          window.history.replaceState(window.history.state, "", destination);
        }, 180);
      }
    };
    const restore = () => {
      const index = ids.findIndex((id) => window.location.hash === `#project-${id}`);
      if (index >= 0) {
        const card = list.children[index] as HTMLElement | undefined;
        if (card) list.scrollTo({ left: scrollTarget(list, card), behavior: "instant" });
      }
      update();
    };
    const observer = new ResizeObserver(restore);
    observer.observe(list);
    list.addEventListener("scroll", update, { passive: true });
    window.addEventListener("hashchange", restore);
    restore();
    return () => {
      clearTimeout(timer);
      observer.disconnect();
      list.removeEventListener("scroll", update);
      window.removeEventListener("hashchange", restore);
    };
  }, [ids]);

  function move(index: number) {
    const list = track.current;
    const card = list?.children[Math.max(0, Math.min(ids.length - 1, index))] as HTMLElement | undefined;
    if (!list || !card) return;
    userInteraction.current = true;
    list.scrollTo({ left: scrollTarget(list, card),
      behavior: window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  function keyboard(event: KeyboardEvent<HTMLUListElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    if (event.key === "Home") move(0);
    else if (event.key === "End") move(ids.length - 1);
    else move(state.index + (event.key === "ArrowRight" ? 1 : -1));
  }

  function pointerDown(event: PointerEvent<HTMLUListElement>) {
    userInteraction.current = true;
    if (event.pointerType !== "mouse" || event.button !== 0 || (event.target as Element).closest("a, button, summary")) return;
    drag.current = { x: event.clientX, y: event.clientY, left: event.currentTarget.scrollLeft, active: false };
  }

  function pointerMove(event: PointerEvent<HTMLUListElement>) {
    const current = drag.current;
    if (!current) return;
    const dx = event.clientX - current.x;
    if (!current.active && Math.abs(dx) > 6 && Math.abs(dx) > Math.abs(event.clientY - current.y)) {
      current.active = true;
      event.currentTarget.dataset.dragging = "true";
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    if (current.active) {
      event.preventDefault();
      event.currentTarget.scrollLeft = current.left - dx;
    }
  }

  function pointerUp(event: PointerEvent<HTMLUListElement>) {
    const current = drag.current;
    drag.current = null;
    delete event.currentTarget.dataset.dragging;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (current?.active) {
      const first = event.currentTarget.children[0] as HTMLElement | undefined;
      const second = event.currentTarget.children[1] as HTMLElement | undefined;
      const stride = first && second ? second.offsetLeft - first.offsetLeft : 1;
      move(Math.round(event.currentTarget.scrollLeft / stride));
    }
  }

  return (
    <>
      {ids.length > 1 && state.scrollable && (
        <div className="project-controls">
          <p className="project-position" aria-live="polite" aria-atomic="true">
            {labels.position.replace("{current}", String(state.index + 1)).replace("{last}", String(state.last + 1)).replace("{total}", String(ids.length))}
          </p>
          <button className="settings-trigger" type="button" aria-label={labels.previous}
            aria-controls="project-list" disabled={!state.previous} onClick={() => move(state.index - 1)}>
            <BsChevronLeft size={20} aria-hidden="true" focusable="false" />
          </button>
          <button className="settings-trigger" type="button" aria-label={labels.next}
            aria-controls="project-list" disabled={!state.next} onClick={() => move(state.index + 1)}>
            <BsChevronRight size={20} aria-hidden="true" focusable="false" />
          </button>
        </div>
      )}
      <p id="project-instructions" className="sr-only">{labels.instructions}</p>
      <ul id="project-list" ref={track} className="project-track" data-count={ids.length}
        aria-label={labels.list} aria-describedby="project-instructions" tabIndex={ids.length > 1 ? 0 : undefined}
        onKeyDown={keyboard} onPointerDown={pointerDown} onPointerMove={pointerMove}
        onPointerUp={pointerUp} onPointerCancel={pointerUp}
        onFocusCapture={(event) => { if (event.target !== event.currentTarget) userInteraction.current = true; }}
        onWheel={(event) => { if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) userInteraction.current = true; }}>
        {children}
      </ul>
    </>
  );
}
