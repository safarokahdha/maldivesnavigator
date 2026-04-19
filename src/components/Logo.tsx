type LogoProps = {
  className?: string;
  mark?: "white" | "brand";
  showWord?: boolean;
};

export function Logo({ className = "", mark = "brand", showWord = true }: LogoProps) {
  const stroke = mark === "white" ? "#ffffff" : "#0a3b4a";
  const wave = mark === "white" ? "#c7ecef" : "#0891b2";
  const star = mark === "white" ? "#ffd37a" : "#e0ad3a";
  const text = mark === "white" ? "text-white" : "text-[#0a3b4a]";
  const sub = mark === "white" ? "text-white/70" : "text-[#0891b2]";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 56 56"
        width="42"
        height="42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Maldives Navigator logo"
        role="img"
      >
        {/* outer ship's wheel rim */}
        <circle cx="28" cy="28" r="23" stroke={stroke} strokeWidth="1.6" />
        {/* inner hub */}
        <circle cx="28" cy="28" r="6" stroke={stroke} strokeWidth="1.4" fill="none" />

        {/* eight wheel handles (spokes extending past the rim) */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 45 * Math.PI) / 180;
          const x1 = 28 + Math.cos(angle) * 23;
          const y1 = 28 + Math.sin(angle) * 23;
          const x2 = 28 + Math.cos(angle) * 27;
          const y2 = 28 + Math.sin(angle) * 27;
          const x3 = 28 + Math.cos(angle) * 6;
          const y3 = 28 + Math.sin(angle) * 6;
          return (
            <g key={i}>
              <line x1={x3} y1={y3} x2={x1} y2={y1} stroke={stroke} strokeWidth="1.1" strokeLinecap="round" />
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
            </g>
          );
        })}

        {/* north-star sextant dot at top */}
        <polygon
          points="28,2 29.2,6.8 34,6.2 30.2,9.4 31.8,14 28,11.2 24.2,14 25.8,9.4 22,6.2 26.8,6.8"
          fill={star}
        />

        {/* center dot */}
        <circle cx="28" cy="28" r="1.8" fill={star} />

        {/* wave underline */}
        <path
          d="M10 46 Q18 42 28 46 T46 46"
          stroke={wave}
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      {showWord && (
        <div className="flex flex-col leading-none">
          <span className={`font-display text-[17px] font-semibold tracking-tight ${text}`}>
            Maldives <span className="italic">Navigator</span>
          </span>
          <span className={`mt-1 text-[9px] uppercase tracking-[0.3em] ${sub}`}>
            A living journal
          </span>
        </div>
      )}
    </div>
  );
}
