"use client";

import { useEffect } from "react";

/**
 * Marks the document as hydrated so the bootstrap failsafe in the head knows
 * React actually took over. Renders nothing.
 */
export default function HydrationFlag() {
  useEffect(() => {
    document.documentElement.classList.add("hydrated");
  }, []);
  return null;
}
