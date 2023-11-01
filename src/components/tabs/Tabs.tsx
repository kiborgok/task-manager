import { useState, ReactNode } from "react";
import { cn } from "../../lib/utils";

type Tab = {
  label: string;
  content: ReactNode;
};

type TabsProps = {
  tabs: Tab[];
};

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div>
      <div className="w-full flex gap-x-4 items-center py-4 border-b border-b-gray-600">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={cn(
              activeTab === index ? "bg-orange-600" : "hover:bg-orange-600/10",
              "px-4 py-2 rounded-md transition ease"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="py-4">{tabs[activeTab].content}</div>
    </div>
  );
};

export default Tabs;