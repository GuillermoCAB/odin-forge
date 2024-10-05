"use client";
import React, { useState } from "react";

interface Tab {
  title: string;
  content: JSX.Element; // Can be any JSX content
}

interface TabsProps {
  tabs: Tab[];
}

export const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <ul className="flex">
        {tabs.map((tab, index) => (
          <li
            key={index}
            className={`w-full ${
              index === activeTab ? "border-b-2 border-black" : ""
            }`}
          >
            <button
              className={`p-4 w-full ${
                index === activeTab
                  ? "bg-white"
                  : "bg-gray-100 hover:bg-gray-200"
              } focus:outline-none`}
              onClick={() => setActiveTab(index)}
            >
              {tab.title}
            </button>
          </li>
        ))}
      </ul>
      <div className="p-4">{tabs[activeTab].content}</div>
    </div>
  );
};
