"use client";

import { useRef } from "react";

export default function SpotlightCard({
  children,
  className = "",
}) {
  const cardRef = useRef(null);

  const handleMouseMove = (event) => {
    const card = cardRef.current;

    if (!card) return;

    const rect =
      card.getBoundingClientRect();

    const x =
      event.clientX - rect.left;

    const y =
      event.clientY - rect.top;

    card.style.setProperty(
      "--spotlight-x",
      `${x}px`
    );

    card.style.setProperty(
      "--spotlight-y",
      `${y}px`
    );
  };

  return (
    <div
      ref={cardRef}
      className={`spotlight-card ${className}`}
      onMouseMove={handleMouseMove}
    >
      <div className="spotlight-effect" />

      <div className="spotlight-content">
        {children}
      </div>
    </div>
  );
}