import React, { useState, useEffect } from "react";
import HostingComponent from "./HostingComponent";
import DatabasesComponent from "./DatabasesComponent";
import FrontendComponent from "./FrontendComponent";
import BackendComponent from "./BackendComponent";

const Technologies: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("hosting");

  useEffect(() => {
    console.log("Technologies component mounted!");
  }, []);

  const tabs = [
    { id: "hosting", label: "Hosting" },
    { id: "databases", label: "Databases" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
  ];

  console.log("Current activeTab:", activeTab);

  const handleTabClick = (tabId: string) => {
    console.log("Button clicked! Tab:", tabId);
    setActiveTab(tabId);
  };

  return (
    <div className="p-4 border border-blue-300 rounded-md">
      <h2 className="text-2xl font-bold mb-4">Technologies</h2>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-4 border-b border-base-300 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors border-b-2 ${
              activeTab === tab.id
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-base-200 text-base-content hover:bg-base-300 border-transparent"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Component - Only render the selected one */}
      <div className="min-h-[200px]">
        {activeTab === "hosting" && <HostingComponent />}
        {activeTab === "databases" && <DatabasesComponent />}
        {activeTab === "frontend" && <FrontendComponent />}
        {activeTab === "backend" && <BackendComponent />}
      </div>
    </div>
  );
};

export default Technologies;
