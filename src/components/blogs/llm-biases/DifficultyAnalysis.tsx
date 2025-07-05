import React from "react";

interface TechnologyData {
  name: string;
  quantity: number;
}

interface DifficultyAnalysisProps {
  title: string;
  easy: TechnologyData[];
  medium: TechnologyData[];
  hard: TechnologyData[];
  explanation: string;
}

const DifficultyAnalysis: React.FC<DifficultyAnalysisProps> = ({
  title,
  easy,
  medium,
  hard,
  explanation,
}) => {
  // Calculate percentage from quantity (same formula as HorizontalBar)
  const calculatePercentage = (quantity: number) => {
    const calculatedPercentage = (quantity / (4887 / 3)) * 100;
    return Math.max(0, Math.min(100, calculatedPercentage));
  };

  // Get the top 3 technologies for each difficulty level (highest quantities)
  const getTop3Technologies = (data: TechnologyData[]) => {
    return data.sort((a, b) => b.quantity - a.quantity).slice(0, 5);
  };

  const difficultySections = [
    {
      name: "Easy",
      topTechs: getTop3Technologies(easy),
    },
    {
      name: "Medium",
      topTechs: getTop3Technologies(medium),
    },
    {
      name: "Hard",
      topTechs: getTop3Technologies(hard),
    },
  ];

  return (
    <div className="w-full space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-base-content mb-6">
          {title}
        </h3>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {difficultySections.map((difficulty) => (
          <div
            key={difficulty.name}
            className={`flex-1 rounded-lg p-6 border border-black`}
          >
            <h4 className="text-lg font-medium text-base-content mb-4 text-center">
              {difficulty.name}
            </h4>
            <div className="space-y-3">
              {difficulty.topTechs.map((tech, index) => (
                <div key={index} className="text-center">
                  <div className="text-sm font-semibold text-base-content">
                    {tech.name}
                  </div>
                  <div className="text-xs text-base-content/70">
                    {calculatePercentage(tech.quantity).toFixed(1)}% (
                    {tech.quantity})
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <p className="text-base-content/70 text-sm max-w-3xl mx-auto">
          {explanation}
        </p>
      </div>
    </div>
  );
};

export default DifficultyAnalysis;
