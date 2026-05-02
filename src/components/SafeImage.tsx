"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

/**
 * Wrapper around next/image that swaps to a styled placeholder block on
 * load failure. Use anywhere a remote image might 404 or be removed
 * upstream (Unsplash deletion, broken hotlink, etc).
 */
export function SafeImage(props: ImageProps) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        aria-label={typeof props.alt === "string" ? props.alt : "Image unavailable"}
        className="absolute inset-0 flex items-center justify-center bg-shore text-[11px] uppercase tracking-[0.18em] text-muted"
      >
        Image unavailable
      </div>
    );
  }

  return (
    <Image
      {...props}
      onError={(e) => {
        setErrored(true);
        // Forward any user-supplied handler.
        if (typeof props.onError === "function") props.onError(e);
      }}
    />
  );
}
