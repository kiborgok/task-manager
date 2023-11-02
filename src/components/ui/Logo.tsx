import { useTranslation } from "react-i18next";

const AppLogo = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className="text-xl text-white uppercase font-bold">
        {t("appTitle")}
        <span className="text-orange-600">{t("sub")}</span>
      </h1>
    </div>
  );
};

export default AppLogo;
