import React from "react";
import { useTranslation } from "react-i18next";
import { defaultLng } from "../../lib/constants";
import { cn } from "../../lib/utils";

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [activeLanguage, setActiveLanguage] = React.useState(defaultLng);

  const changeLanguage = (lng: "fr" | "en") => {
    setActiveLanguage(lng);
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center gap-x-2">
      <button
        onClick={() => changeLanguage("en")}
        aria-label="English"
        className={cn(
          activeLanguage === "en" && "bg-orange-600/70",
          "border border-gray-600 rounded-full p-1 w-8 h-8 flex items-center justify-center"
        )}
      >
        🇬🇧
      </button>
      <button
        onClick={() => changeLanguage("fr")}
        aria-label="Français"
        className={cn(
          activeLanguage === "fr" && "bg-orange-600/70",
          "border border-gray-600 rounded-full p-1 w-8 h-8 flex items-center justify-center"
        )}
      >
        🇫🇷
      </button>
    </div>
  );
}

export default LanguageSwitcher;
