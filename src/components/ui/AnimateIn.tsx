"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  stagger?: boolean;
  delay?: number;
}

export function AnimateIn({
  children,
  className,
  style,
  stagger = false,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const apply = () => el.classList.add("in-view");
          delay ? setTimeout(apply, delay) : apply();
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={style}
      {...(stagger ? { "data-stagger": "" } : { "data-animate": "" })}
    >
      {children}
    </div>
  );
}
