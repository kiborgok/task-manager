import { LogOut } from "lucide-react";
import AppLogo from "../ui/Logo";
import { useAuthUser } from "../../stores/useAuthUser";
import { useNavigate } from "react-router";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { clearState, user } = useAuthUser();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    localStorage.removeItem("auth_user");
    clearState();
    toast.success(t("logout-success"));
    navigate("/login");
  };
  return (
    <nav className="flex w-full items-center justify-between gap-x-4 sticky top-0 bg-gray-800/60 backdrop-blur-lg z-50 p-4">
      <div className="max-sm:flex-1">
        <AppLogo />
      </div>

      <div className="flex gap-x-4 max-sm:flex-1">
        <LanguageSwitcher />
        {user && (
          <div className="flex gap-x-2 items-center max-sm:fixed max-sm:bottom-0 max-sm:left-0">
            <img
              src={user.avatar}
              alt={user.email}
              className="w-8 lg:min-w-10 h-8 lg:min-h-10 rounded-full"
            />
            <p className="max-sm:hidden">{user.email.split("@")[0]}</p>
          </div>
        )}

        <button className="bg-orange-100 p-2 rounded-md" onClick={handleLogout}>
          <LogOut className="stroke-orange-600" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
