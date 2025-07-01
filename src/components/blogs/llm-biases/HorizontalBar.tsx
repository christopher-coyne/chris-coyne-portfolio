import React, { useState, useEffect } from "react";

interface HorizontalBarProps {
  title: string;
  percentage: number;
}

const HorizontalBar: React.FC<HorizontalBarProps> = ({ title, percentage }) => {
  // Ensure percentage is between 0 and 100
  const clampedPercentage = Math.max(0, Math.min(100, percentage));
  const [isClicked, setIsClicked] = useState(false);
  const [currentPercentage, setCurrentPercentage] = useState(clampedPercentage);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    if (!isClicked) {
      setIsClicked(true);
      // Start filling animation to 100%
      setCurrentPercentage(100);
    } else {
      // Reset to original state
      setIsClicked(false);
      setIsExpanded(false);
      setCurrentPercentage(clampedPercentage);
    }
  };

  // When the fill animation completes, expand the content
  useEffect(() => {
    if (isClicked && currentPercentage === 100) {
      const timer = setTimeout(() => {
        setIsExpanded(true);
      }, 500); // Wait for fill animation to complete
      return () => clearTimeout(timer);
    }
  }, [isClicked, currentPercentage]);

  return (
    <div
      className="relative w-full rounded-lg p-4 border border-base-300 overflow-hidden transition-all duration-500 hover:shadow-md cursor-pointer"
      style={{
        background: isExpanded
          ? "rgb(147 197 253)"
          : `linear-gradient(to right, rgb(147 197 253) ${currentPercentage}%, rgb(var(--b2)) ${currentPercentage}%)`,
      }}
      onClick={handleClick}
    >
      <div className="relative z-10 flex justify-between items-center">
        <span className="text-base-content font-medium">{title}</span>
        <span className="text-base-content/70 text-sm">
          {isExpanded ? "100%" : `${currentPercentage}%`}
        </span>
      </div>

      {isExpanded && (
        <div className="relative z-10 mt-4 pt-4 border-t border-base-content/20 animate-fade-in">
          <p className="text-base-content/80 text-sm leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      )}
    </div>
  );
};

export default HorizontalBar;
