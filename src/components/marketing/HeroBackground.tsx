import { FloatingWords } from "./FloatingWords";

/** The navy gradient + glow blobs + drifting language words shared by the home hero and the coming-soon page. */
export function HeroBackground() {
  return (
    <>
      <div
        className="glow-blob h-[26rem] w-[26rem] animate-fade-in-up bg-accent-500/20"
        style={{ top: "-8rem", right: "-6rem" }}
      />
      <div
        className="glow-blob h-[22rem] w-[22rem] animate-fade-in-up bg-navy-500/30"
        style={{ bottom: "-6rem", left: "-8rem", animationDelay: "150ms" }}
      />
      <FloatingWords className="animate-fade-in-up" />
    </>
  );
}
