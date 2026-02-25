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
      bgColor: "bg-green-500/20",
      borderColor: "border-green-500",
    },
    {
      name: "Medium",
      topTechs: getTop3Technologies(medium),
      bgColor: "bg-orange-500/20",
      borderColor: "border-orange-500",
    },
    {
      name: "Hard",
      topTechs: getTop3Technologies(hard),
      bgColor: "bg-red-500/20",
      borderColor: "border-red-500",
    },
  ];

  return (
    <div className="w-full space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-foreground mb-6">
          {title}
        </h3>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {difficultySections.map((difficulty) => (
          <div
            key={difficulty.name}
            className="flex-1 rounded-lg p-6 border border-gray-300"
          >
            <h4
              className={`text-lg font-medium text-white mb-4 text-center rounded-lg py-2 px-4 ${difficulty.bgColor.replace("/20", "")} ${difficulty.borderColor}`}
            >
              {difficulty.name}
            </h4>
            <div className="space-y-3">
              {difficulty.topTechs.map((tech, index) => (
                <div key={index} className="text-center">
                  <div className="text-sm font-semibold text-foreground">
                    {tech.name}
                  </div>
                  <div className="text-xs text-foreground/70">
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
        <p className="text-foreground/70 text-sm max-w-3xl mx-auto">
          {explanation}
        </p>
      </div>
    </div>
  );
};

export default DifficultyAnalysis;
