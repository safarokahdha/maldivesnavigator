import Script from "next/script";

// Plausible analytics — privacy-friendly, cookieless.
// Renders only when NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set, so dev/preview
// don't pollute production stats.

export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;
  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
