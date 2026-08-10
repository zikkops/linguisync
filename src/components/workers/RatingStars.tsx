import { Star } from "lucide-react";

export function RatingStars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            width={size}
            height={size}
            className={i < Math.round(rating) ? "fill-accent-500 text-accent-500" : "fill-navy-100 text-navy-200"}
          />
        ))}
      </div>
      <span className="text-xs font-bold text-navy-700">{rating.toFixed(1)}</span>
    </div>
  );
}
