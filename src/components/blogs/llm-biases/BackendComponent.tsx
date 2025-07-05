import React from "react";
import HorizontalBar from "./HorizontalBar";
import LLMAnalysis from "./LLMAnalysis";
import DifficultyAnalysis from "./DifficultyAnalysis";

const BackendComponent: React.FC = () => {
  const backendLanguages = [
    { name: "Javascript/Node.js", quantity: 3557 },
    { name: "Python/Django", quantity: 1029 },
    { name: "Go", quantity: 143 },
    { name: "Solidity", quantity: 56 },
    { name: "Java", quantity: 30 },
  ];

  const backendFrameworks = [
    { name: "Express", quantity: 3437 },
    { name: "FastAPI", quantity: 522 },
    { name: "NestJS", quantity: 346 },
    { name: "Django", quantity: 156 },
    { name: "Flask", quantity: 112 },
    { name: "Gin", quantity: 48 },
    { name: "Spring Boot", quantity: 27 },
    { name: "Echo", quantity: 19 },
    { name: "Gorilla Mux", quantity: 15 },
    { name: "Hardhat", quantity: 15 },
  ];

  const difficultyAnalysisData = {
    easy: [
      {
        name: "JavaScript/Node.js",
        quantity: 1174 + 85 + 1,
      },
      { name: "Python", quantity: 127 },
      { name: "Solidity", quantity: 3 },
      { name: "C++", quantity: 1 },
    ].sort((a, b) => b.quantity - a.quantity),
    medium: [
      {
        name: "JavaScript/Node.js",
        quantity: 121 + 1078,
      },
      { name: "Python", quantity: 196 + 80 + 80 + 8 + 1 + 1 + 1 }, // Combined Python + Django + FastAPI + Flask + Flask API + Apache Airflow + Apache NiFi
      { name: "Go", quantity: 13 + 4 + 3 + 3 + 1 + 2 + 1 }, // Combined Go + Gin + Fiber + Go net/http + Go ReverseProxy + Gorilla Mux + Chi
      { name: "Next.js API Routes", quantity: 16 },
      { name: "Solidity", quantity: 5 + 4 }, // Combined Solidity + Hardhat
      { name: "Ruby", quantity: 1 + 1 }, // Combined Ruby + Ruby on Rails
    ].sort((a, b) => b.quantity - a.quantity),
    hard: [
      {
        name: "JavaScript/Node.js",
        quantity: 121 + 1078 + 2,
      },
      {
        name: "Python",
        quantity: 706,
      },
      {
        name: "Go",
        quantity: 130,
      },
      {
        name: "Java",
        quantity: 30,
      },
      { name: "Solidity", quantity: 48 },
      { name: "Rust", quantity: 12 },
      { name: "C++", quantity: 1 },
      { name: "Elixir", quantity: 1 },
    ].sort((a, b) => b.quantity - a.quantity),
    explanation:
      "This analysis shows backend technologies categorized by complexity and architectural requirements. Easy technologies focus on basic server functionality, while hard technologies require understanding of distributed systems, scalability patterns, and complex system design principles.",
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-base-content">
          Backend Technologies
        </h2>
        <p className="text-base-content/70 max-w-2xl mx-auto">
          Explore the popularity and capabilities of major backend frameworks
          and languages. Each bar represents the relative adoption rate and
          developer preference in server-side development.
        </p>
      </div>

      <div className="space-y-4">
        {backendLanguages.map((language, index) => (
          <HorizontalBar
            key={index}
            title={language.name}
            quantity={language.quantity}
          />
        ))}
      </div>

      <div className="space-y-2">
        {backendFrameworks.map((framework, index) => (
          <HorizontalBar
            key={index}
            title={framework.name}
            quantity={framework.quantity}
          />
        ))}
      </div>
      <p>
        Once again, Javascript dominates, but this time, on the backend! Given
        the convenience of using the same language on all ends of the stack,
        this does not shock me. Python comes in at a distant second, mainly
        represented with the Flask, Django, and FastAPI frameworks. From there,
        Go, Solidity, Java, and some other languages trail behind.
      </p>
      <p>
        Just like with the frontend stack recommendations, I did expect the
        results, but was still surprised by how lopsided it turned out to be.
        Java, the defacto backend for enterprise companies doesn't even get
        recommended as a solution in 1% of projects, and is actually behind
        Solidity. C# and PHP are never recommended, and Ruby is only recommended
        once. We have to ask ourselves - is it ideal for the entire web of the
        future to be Typescript and Python? Should we be worried that newer
        developers may not have to deal with the intricacies of Rust's memory
        management, or the functional programming involved in elixir?
      </p>

      <div className="border-t border-base-300 pt-8">
        <DifficultyAnalysis
          title="Backend Technology Difficulty Analysis"
          easy={difficultyAnalysisData.easy}
          medium={difficultyAnalysisData.medium}
          hard={difficultyAnalysisData.hard}
          explanation={difficultyAnalysisData.explanation}
        />
      </div>
    </div>
  );
};

export default BackendComponent;
