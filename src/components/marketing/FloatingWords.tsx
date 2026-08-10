const WORDS: {
  text: string;
  left: string;
  top: string;
  size: string;
  duration: string;
  delay: string;
  dx: string;
  opacity: number;
}[] = [
  { text: "Hello", left: "5%", top: "20%", size: "2.4rem", duration: "22s", delay: "-2s", dx: "14px", opacity: 0.15 },
  { text: "Bonjour", left: "16%", top: "68%", size: "0.95rem", duration: "26s", delay: "-9s", dx: "-10px", opacity: 0.14 },
  { text: "Hola", left: "30%", top: "8%", size: "1.3rem", duration: "20s", delay: "-14s", dx: "10px", opacity: 0.16 },
  { text: "こんにちは", left: "42%", top: "78%", size: "1.7rem", duration: "25s", delay: "-4s", dx: "-14px", opacity: 0.11 },
  { text: "مرحبا", left: "58%", top: "16%", size: "1.1rem", duration: "28s", delay: "-11s", dx: "12px", opacity: 0.15 },
  { text: "你好", left: "68%", top: "60%", size: "2.9rem", duration: "18s", delay: "-6s", dx: "-8px", opacity: 0.13 },
  { text: "Ciao", left: "80%", top: "10%", size: "1.9rem", duration: "23s", delay: "-16s", dx: "16px", opacity: 0.12 },
  { text: "Привет", left: "8%", top: "88%", size: "1rem", duration: "27s", delay: "-8s", dx: "-6px", opacity: 0.13 },
  { text: "Olá", left: "50%", top: "42%", size: "2.1rem", duration: "21s", delay: "-3s", dx: "10px", opacity: 0.14 },
  { text: "Guten Tag", left: "78%", top: "44%", size: "0.85rem", duration: "25s", delay: "-19s", dx: "-12px", opacity: 0.12 },
  { text: "안녕하세요", left: "88%", top: "72%", size: "1.4rem", duration: "24s", delay: "-13s", dx: "-10px", opacity: 0.13 },
  { text: "Merhaba", left: "24%", top: "42%", size: "1.55rem", duration: "29s", delay: "-21s", dx: "8px", opacity: 0.1 },
];

/** Slow-drifting language words behind the hero's glass panels — pure atmosphere, no interaction. */
export function FloatingWords({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`} style={style} aria-hidden>
      {WORDS.map((w, i) => (
        <span
          key={i}
          className="float-word font-display italic text-white"
          style={{
            left: w.left,
            top: w.top,
            fontSize: w.size,
            animationDuration: w.duration,
            animationDelay: w.delay,
            ["--word-dx" as string]: w.dx,
            ["--word-opacity" as string]: w.opacity,
          }}
        >
          {w.text}
        </span>
      ))}
    </div>
  );
}
