"use client";

import { useEffect, useState, useRef } from "react";
import { useInView, motion, animate } from "framer-motion";

interface CounterProps {
  value: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

export default function Counter({ 
  value, 
  duration = 2, 
  delay = 0, 
  suffix = "", 
  prefix = "", 
  decimals = 0 
}: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration,
        delay,
        ease: "easeOut",
        onUpdate(value) {
          setCount(value);
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value, duration, delay]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString("en-IN", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}
