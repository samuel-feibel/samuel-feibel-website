"use client";

import { useEffect } from "react";

export function useFadeIn() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<Element>(".fade-in"));

    const show = (el: Element, delay = 0) =>
      setTimeout(() => el.classList.add("visible"), delay);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            show(entry.target, i * 80);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px 80px 0px" }
    );

    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const alreadyInView = rect.top < window.innerHeight && rect.bottom > 0;
      if (alreadyInView) {
        show(el);
      } else {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);
}
