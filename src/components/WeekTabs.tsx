"use client";

import { useState, type ReactNode } from "react";

type Tab = {
  key: string;
  label: string;
  icon: string;
  content: ReactNode;
};

export function WeekTabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0]?.key);
  const activeTab = tabs.find((t) => t.key === active) ?? tabs[0];

  if (tabs.length === 0) return null;

  return (
    <div className="mb-12">
      <div className="flex border-b border-neutral-200 mb-8">
        {tabs.map((tab) => {
          const isActive = tab.key === activeTab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActive(tab.key)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-semibold tracking-wide border-t-2 transition-colors ${
                isActive
                  ? "border-black text-black"
                  : "border-transparent text-neutral-400 hover:text-neutral-600"
              }`}
            >
              <span className="text-lg leading-none">{tab.icon}</span>
              {tab.label}
            </button>
          );
        })}
      </div>

      <div>{activeTab.content}</div>
    </div>
  );
}
