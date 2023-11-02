import AppLogo from "../ui/Logo";
import AuthForm from "./AuthForm";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../ui/LanguageSwitcher";

const SignUpForm = () => {
  const { t } = useTranslation();

  return (
    <div className="section_wrapper h-[80vh]">
      <div className="py-4 flex items-center justify-between">
        <AppLogo />
        <LanguageSwitcher />
      </div>
      <div className="flex flex-col h-full gap-y-4 items-center justify-center">
        <h1 className="text-2xl font-semibold pb-8">{t("signup-header")}</h1>
        <AuthForm />
        <p>
          {t("msg-login")}{" "}
          <Link
            to="/login"
            className="hover:underline underline-offset-2 text-blue-500"
          >
            {t("login")}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
