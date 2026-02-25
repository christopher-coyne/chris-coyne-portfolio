import React from "react";

interface HorizontalBarProps {
  title: string;
  quantity: number;
}

const HorizontalBar: React.FC<HorizontalBarProps> = ({ title, quantity }) => {
  // Calculate percentage from quantity (divide by 4887)
  const calculatedPercentage = (quantity / 4887) * 100;
  const clampedPercentage = Math.max(0, Math.min(100, calculatedPercentage));

  return (
    <div
      className="relative w-full rounded-lg p-3 border border-border overflow-hidden transition-all duration-300 hover:shadow-sm text-black"
      style={{
        background: `linear-gradient(to right, rgb(191 219 254) ${clampedPercentage}%, var(--color-bg) ${clampedPercentage}%)`,
      }}
    >
      <div className="relative z-10 flex justify-between items-center">
        <span className="font-medium text-sm">{title}</span>
        <span className="text-xs" style={{ color: "#000000 !important" }}>
          {clampedPercentage.toFixed(1)}% ({quantity})
        </span>
      </div>
    </div>
  );
};

export default HorizontalBar;
