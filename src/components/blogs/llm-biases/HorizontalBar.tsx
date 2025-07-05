import React from "react";

interface HorizontalBarProps {
  title: string;
  quantity: number;
}

const HorizontalBar: React.FC<HorizontalBarProps> = ({ title, quantity }) => {
  // Calculate percentage from quantity (divide by 4887)
  const calculatedPercentage = (quantity / 4887) * 100;
  // Ensure percentage is between 0 and 100
  const clampedPercentage = Math.max(0, Math.min(100, calculatedPercentage));

  return (
    <div
      className="relative w-full rounded-lg p-3 border border-base-300 overflow-hidden transition-all duration-300 hover:shadow-sm"
      style={{
        background: `linear-gradient(to right, rgb(191 219 254) ${clampedPercentage}%, white ${clampedPercentage}%)`,
      }}
    >
      <div className="relative z-10 flex justify-between items-center">
        <span className="text-base-content font-medium text-sm">{title}</span>
        <span className="text-base-content/70 text-xs">
          {clampedPercentage.toFixed(1)}% ({quantity})
        </span>
      </div>
    </div>
  );
};

export default HorizontalBar;
