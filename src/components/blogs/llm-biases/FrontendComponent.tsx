import React from "react";
import HorizontalBar from "./HorizontalBar";
import LLMAnalysis from "./LLMAnalysis";
import DifficultyAnalysis from "./DifficultyAnalysis";

const FrontendComponent: React.FC = () => {
  // react, nextjs, angular, vue, svelte, astro, alpine, hugo, eleventy, jekyll, Django templates, jinja
  const frontendFrameworks = [
    { name: "React", quantity: 4055 },
    { name: "Next.js", quantity: 1146 },
    { name: "Angular", quantity: 0 },
    { name: "Svelte", quantity: 1 },
    { name: "SvelteKit", quantity: 3 },
    { name: "Astro", quantity: 5 },
    { name: "Alpine", quantity: 5 },
    { name: "Hugo", quantity: 3 },
    { name: "Eleventy", quantity: 1 },
    { name: "Jekyll", quantity: 1 },
    { name: "Django Templates", quantity: 3 },
    { name: "Jinja", quantity: 1 },
  ];

  const frontendStyleLibraries = [
    { name: "Tailwind CSS", quantity: 2074 + 13 + 24 + 1 + 8 + 1 + 5 + 1 }, // Combined Tailwind CSS + Shadcn UI + Tailwind CSS + Headless UI + Tailwind CSS + Components + DaisyUI + Tailwind CSS + Tailwind CSS + Headless UI + Tailwind CSS + Custom + Tailwind CSS + Tremor
    { name: "Material-UI", quantity: 1433 + 6 + 1 }, // Combined Material-UI + Material-UI + Custom + Material-UI DataGrid
    { name: "Chakra UI", quantity: 510 },
    { name: "Headless UI", quantity: 138 },
    { name: "Ant Design", quantity: 67 },
    { name: "Bootstrap", quantity: 40 + 8 }, // Combined Bootstrap + Bootstrap 5
    { name: "Radix UI", quantity: 37 },
    { name: "Emotion", quantity: 16 },
    { name: "DaisyUI", quantity: 13 },
    { name: "SCSS", quantity: 6 + 5 }, // Combined SCSS + Sass
    { name: "Mantine", quantity: 4 },
    { name: "Pico.css", quantity: 3 },
    { name: "NativeBase", quantity: 3 + 1 }, // Combined NativeBase + Native Base
    { name: "NativeWind", quantity: 3 },
    { name: "React Native Paper", quantity: 2 },
    { name: "Picnic CSS", quantity: 1 },
    { name: "Flowbite", quantity: 1 },
    { name: "Elastic UI", quantity: 1 },
    { name: "React Native Elements", quantity: 1 },
  ].sort((a, b) => b.quantity - a.quantity);

  const llmAnalysisData = {
    claude: [
      { name: "React", quantity: 1298 + 4 + 20 + 1 }, // Combined React + React.js + React Native + Create React App
      { name: "Next.js", quantity: 553 },
      { name: "SvelteKit", quantity: 1 },
    ].sort((a, b) => b.quantity - a.quantity),
    gemini: [
      { name: "React", quantity: 1173 + 4 + 20 + 4 }, // Combined React + React.js + React Native + Create React App
      { name: "Next.js", quantity: 559 },
      { name: "Vue.js", quantity: 12 + 1 + 1 }, // Combined Vue.js + Vue Router + Pinia
      { name: "HTMX", quantity: 6 + 1 }, // Combined HTMX + HTMX/Alpine.js
      { name: "Astro", quantity: 5 },
      { name: "Alpine.js", quantity: 4 },
      { name: "Django Templates", quantity: 3 },
      { name: "SvelteKit", quantity: 2 },
      { name: "Hugo", quantity: 2 },
      { name: "Electron", quantity: 2 },
      { name: "Svelte", quantity: 1 },
      { name: "Eleventy", quantity: 1 },
      { name: "Flutter", quantity: 1 },
    ].sort((a, b) => b.quantity - a.quantity),
    chatgpt: [
      { name: "React", quantity: 1584 + 2 + 1 + 3 }, // Combined React + React Native + React Native Elements + Create React App
      { name: "Next.js", quantity: 34 },
      { name: "Hugo", quantity: 1 },
      { name: "Jekyll", quantity: 1 },
      { name: "jQuery", quantity: 1 },
    ].sort((a, b) => b.quantity - a.quantity),
    explanation:
      "This analysis compares how different LLMs perform when analyzing various frontend frameworks. Each percentage represents the accuracy and depth of analysis provided by each model when discussing frontend development patterns and best practices.",
  };

  const difficultyAnalysisData = {
    easy: [
      { name: "React", quantity: 1314 + 4 + 4 }, // Combined React + React.js + Create React App
      { name: "Next.js", quantity: 248 },
      { name: "Vue.js", quantity: 12 + 1 + 1 }, // Combined Vue.js + Vue Router + Pinia
      { name: "HTMX", quantity: 6 + 1 }, // Combined HTMX + HTMX/Alpine.js
      { name: "Astro", quantity: 5 },
      { name: "Alpine.js", quantity: 4 },
      { name: "Hugo", quantity: 3 },
      { name: "SvelteKit", quantity: 2 },
      { name: "Django Templates", quantity: 2 },
      { name: "jQuery", quantity: 2 },
      { name: "Jekyll", quantity: 1 },
      { name: "Eleventy", quantity: 1 },
      { name: "Svelte", quantity: 1 },
    ].sort((a, b) => b.quantity - a.quantity),
    medium: [
      { name: "React", quantity: 1399 + 3 + 4 + 7 + 1 }, // Combined React + React.js + Create React App + React Native + React Native Elements
      { name: "Next.js", quantity: 418 },
      { name: "Django Templates", quantity: 1 },
    ],
    hard: [
      { name: "React", quantity: 1342 + 1 + 35 }, // Combined React + React.js + React Native
      { name: "Next.js", quantity: 480 },
      { name: "Electron", quantity: 3 },
      { name: "SvelteKit", quantity: 1 },
      { name: "Flutter", quantity: 1 },
    ].sort((a, b) => b.quantity - a.quantity),
    explanation:
      "React and NextJS dominates across difficulty levels, with little variation.",
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-base-content">
          Frontend Technologies
        </h2>
        <p className="text-base-content/70 max-w-2xl mx-auto">
          Explore the popularity and capabilities of major frontend frameworks.
          Each bar represents the relative market share and developer
          satisfaction in modern web development.
        </p>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-base-content text-center">
          Frontend Frameworks
        </h3>
        {frontendFrameworks.map((framework, index) => (
          <HorizontalBar
            key={index}
            title={framework.name}
            quantity={framework.quantity}
          />
        ))}
      </div>
      <div className="mt-8 space-y-2">
        <h3 className="text-lg font-semibold text-base-content text-center">
          Frontend Style Libraries
        </h3>
        {frontendStyleLibraries.map((library, index) => (
          <HorizontalBar
            key={index}
            title={library.name}
            quantity={library.quantity}
          />
        ))}
      </div>
      <p>
        To the surprise of probably no one, React dominates the recommendations,
        with over 80% of the over 1600 projects having it recommended as a
        frontend technology. Next.js comes in shortly after, being recommended
        in around 20% of all projects. I'm in agreement with Max here, it seems
        as though in the near future, React will dominate the vast majority of
        new projects made by beginners. If for no other reason, the consistency
        with which LLMs recommend it as a preferred choice.
      </p>
      <p>
        The very surprising part of this, however, is how infrequently other top
        frontend frameworks are recommended by these LLMs. Angular, the 4th most
        commonly used web framework by professional developers, according to
        this survey on stack overflow
        https://survey.stackoverflow.co/2024/technology#most-popular-technologies-webframe-prof
        does not make an appearance ONCE. Well that's actually not quite true.
        Despite never being recommended as a frontend framework, it is mentioned
        heavily in these recommendations, when the LLMs recommend NestJS, and
        they compare its dependency injection to that of Angular's.
      </p>
      <p>
        Vue, Svelte, and Astro (as well as some static site builders) are also
        mentioned, but in very small quantities.
      </p>
      <p>
        The style library recommendations are also expected, tailwind is head
        and shoulders above its competition when it comes to recommendations.
        Personally, I'm actually a fan of tailwind, but I am particularly
        disturbed by how frequently it is recommended for beginner projects. In
        my humble opinion, beginners should start out with vanilla css and html,
        just like they should learn vanilla javascript before jumping to react.
        And for most of these beginner projects, tailwind might speed up the
        development process, but deprive them of the fundamentals.
      </p>
      <p>
        I'm also a little surprised by how low bootstrap is on the list. I
        remember when I first dipped my toes into web development back in the
        late 20-teens, it seemed like bootstrap was all the rage! Oh how times
        have changed...
      </p>
      {/*
      <div className="border-t border-base-300 pt-8">
        <LLMAnalysis
          title="Frontend Framework Choice By LLM"
          claude={llmAnalysisData.claude}
          gemini={llmAnalysisData.gemini}
          chatgpt={llmAnalysisData.chatgpt}
          explanation={llmAnalysisData.explanation}
        />
      </div>
      */}
      <div className="border-t border-base-300 pt-8">
        <DifficultyAnalysis
          title="Difficulty Analysis"
          easy={difficultyAnalysisData.easy}
          medium={difficultyAnalysisData.medium}
          hard={difficultyAnalysisData.hard}
          explanation={difficultyAnalysisData.explanation}
        />
      </div>
    </div>
  );
};

export default FrontendComponent;
