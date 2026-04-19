type LogoProps = {
  className?: string;
  mark?: "white" | "brand";
  showWord?: boolean;
};

export function Logo({ className = "", mark = "brand", showWord = true }: LogoProps) {
  const stroke = mark === "white" ? "#ffffff" : "#0a3b4a";
  const wave = mark === "white" ? "#c7ecef" : "#0891b2";
  const dot = mark === "white" ? "#ffd37a" : "#e0ad3a";
  const text = mark === "white" ? "text-white" : "text-[#0a3b4a]";
  const sub = mark === "white" ? "text-white/70" : "text-[#0891b2]";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 56 56"
        width="40"
        height="40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Maldives Compass logo"
        role="img"
      >
        {/* outer compass ring */}
        <circle cx="28" cy="28" r="25" stroke={stroke} strokeWidth="1.6" />
        {/* tick marks N/E/S/W */}
        <line x1="28" y1="4" x2="28" y2="9" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
        <line x1="28" y1="47" x2="28" y2="52" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
        <line x1="4" y1="28" x2="9" y2="28" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
        <line x1="47" y1="28" x2="52" y2="28" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />

        {/* compass star (needle) — north filled, south hollow */}
        <polygon points="28,9 32,28 28,47 24,28" fill={stroke} />
        <polygon points="9,28 28,32 47,28 28,24" fill="none" stroke={stroke} strokeWidth="1.2" />
        {/* sun dot */}
        <circle cx="28" cy="28" r="2.4" fill={dot} />

        {/* wave underline (atoll ripple) */}
        <path
          d="M10 40 Q18 36 28 40 T46 40"
          stroke={wave}
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      {showWord && (
        <div className="flex flex-col leading-none">
          <span className={`font-display text-[17px] font-semibold tracking-tight ${text}`}>
            Maldives <span className="italic">Compass</span>
          </span>
          <span className={`mt-1 text-[9px] uppercase tracking-[0.3em] ${sub}`}>
            A living journal
          </span>
        </div>
      )}
    </div>
  );
}
