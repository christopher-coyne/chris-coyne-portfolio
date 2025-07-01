import React from "react";
import HorizontalBar from "./HorizontalBar";
import LLMAnalysis from "./LLMAnalysis";

const HostingComponent: React.FC = () => {
  const hostingProviders = [
    { name: "Amazon Web Services", percentage: 85 },
    { name: "Azure", percentage: 72 },
    { name: "Google Cloud", percentage: 68 },
    { name: "Digital Ocean", percentage: 45 },
  ];

  const llmAnalysisData = {
    claude: [
      { technology: "React", percentage: 89.2 },
      { technology: "Node.js", percentage: 76.5 },
      { technology: "Python", percentage: 82.1 },
      { technology: "TypeScript", percentage: 91.3 },
    ],
    gemini: [
      { technology: "React", percentage: 84.7 },
      { technology: "Node.js", percentage: 79.2 },
      { technology: "Python", percentage: 88.6 },
      { technology: "TypeScript", percentage: 86.9 },
    ],
    chatgpt: [
      { technology: "React", percentage: 87.1 },
      { technology: "Node.js", percentage: 81.4 },
      { technology: "Python", percentage: 85.3 },
      { technology: "TypeScript", percentage: 89.7 },
    ],
    explanation:
      "This analysis compares how different LLMs perform when analyzing various technologies. Each percentage represents the accuracy and depth of analysis provided by each model when discussing the respective technology stack.",
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-base-content">
          Cloud Hosting Providers
        </h2>
        <p className="text-base-content/70 max-w-2xl mx-auto">
          Explore the market share and capabilities of major cloud hosting
          providers. Each bar represents the relative market presence and
          feature completeness.
        </p>
      </div>

      <div className="space-y-4">
        {hostingProviders.map((provider, index) => (
          <HorizontalBar
            key={index}
            title={provider.name}
            percentage={provider.percentage}
          />
        ))}
      </div>

      <div className="border-t border-base-300 pt-8">
        <LLMAnalysis
          title="Hosting of choice By LLM"
          claude={llmAnalysisData.claude}
          gemini={llmAnalysisData.gemini}
          chatgpt={llmAnalysisData.chatgpt}
          explanation={llmAnalysisData.explanation}
        />
      </div>
    </div>
  );
};

export default HostingComponent;
