import React from "react";

interface TechnologyData {
  technology: string;
  percentage: number;
}

interface LLMAnalysisProps {
  title: string;
  claude: TechnologyData[];
  gemini: TechnologyData[];
  chatgpt: TechnologyData[];
  explanation: string;
}

const LLMAnalysis: React.FC<LLMAnalysisProps> = ({
  title,
  claude,
  gemini,
  chatgpt,
  explanation,
}) => {
  // Get the top technology for each LLM (highest percentage)
  const getTopTechnology = (data: TechnologyData[]) => {
    return data.reduce((prev, current) =>
      prev.percentage > current.percentage ? prev : current,
    );
  };

  const llmSections = [
    {
      name: "Claude",
      topTech: getTopTechnology(claude),
      color: "bg-purple-100",
    },
    { name: "Gemini", topTech: getTopTechnology(gemini), color: "bg-blue-100" },
    {
      name: "ChatGPT",
      topTech: getTopTechnology(chatgpt),
      color: "bg-green-100",
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
        {llmSections.map((llm) => (
          <div
            key={llm.name}
            className={`flex-1 rounded-lg p-6 ${llm.color} border border-base-300`}
          >
            <h4 className="text-lg font-medium text-base-content mb-3 text-center">
              {llm.name}
            </h4>
            <div className="text-center">
              <div className="text-base font-semibold text-base-content">
                {llm.topTech.technology}
              </div>
              <div className="text-sm text-base-content/70 mt-1">
                {llm.topTech.percentage}%
              </div>
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

export default LLMAnalysis;
