import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useLocation, useNavigate } from "react-router";
import { BASE_API_URL } from "../../lib/constants";
import { Loader } from "lucide-react";
import { UserType } from "../../types/types";
import { useAuthUser } from "../../stores/useAuthUser";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

const AuthForm = () => {
  const { pathname } = useLocation();
  const { setUser } = useAuthUser();
  const navigate = useNavigate();
  const [credentials, setCredentials] = React.useState({
    email: "",
    password: "",
  });
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>();

  const isSignup = pathname === "/signup";

  const { data: users } = useQuery({
    queryKey: ["usersData", `${BASE_API_URL}/users`],
    queryFn: () => axios.get<UserType[]>(`${BASE_API_URL}/users`),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (userData: { email: string; password: string }) => {
      return axios.post<UserType>(`${BASE_API_URL}/users`, {
        ...userData,
      });
    },
    onSuccess: ({ data }) => {
      setCredentials({ email: "", password: "" });

      // store data in local storage
      localStorage.setItem("auth_user", JSON.stringify(data));
      setUser({ user: data });
      toast.success(t("register-success"));
      // navigate to main app
      navigate("/");
    },
  });

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (users && users.data.length > 0 && isSignup) {
      const user = users.data.find(
        (user) =>
          user.email === credentials.email &&
          user.password === credentials.password
      );
      if (user) {
        setErrorMessage(t("signup-error"));
        return;
      } else {
        mutate(credentials);
      }
    } else {
      // is login so try finding the user from the fetched users
      if (users && users.data.length > 0) {
        const user = users.data.find(
          (user) =>
            user.email === credentials.email &&
            user.password === credentials.password
        );
        if (user) {
          localStorage.setItem("auth_user", JSON.stringify(user));
          setUser({ user });
          toast.success(t("login-success"));
          // navigate to main app
          navigate("/");
        } else {
          setErrorMessage(t("login-error"));
        }
      }
    }
  };

  return (
    <form action="" onSubmit={handleAuth} className="w-3/4 mx-auto space-y-4">
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      <div className="space-y-2">
        <label htmlFor="email" className="text-gray-300">
          {t("mail")}
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={credentials.email}
          onFocus={() => setErrorMessage(undefined)}
          // disabled={isPending}
          onChange={(e) =>
            setCredentials((state) => ({ ...state, email: e.target.value }))
          }
          placeholder={t("mail-placeholder")}
          className="w-full rounded-lg bg-gray-700 focus:stroke-gray-400 focus-visible:stroke-gray-400 focus:outline-gray-400 focus-visible:outline-1 font-mono font-light px-4 py-2"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-gray-300">
          {t("password")}
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={credentials.password}
          onFocus={() => setErrorMessage(undefined)}
          // disabled={isPending}
          onChange={(e) =>
            setCredentials((state) => ({ ...state, password: e.target.value }))
          }
          placeholder={t("password-placeholder")}
          className="w-full rounded-lg bg-gray-700 focus:stroke-gray-400 focus-visible:stroke-gray-400 focus:outline-gray-400 focus-visible:outline-1 font-mono font-light px-4 py-2"
        />
      </div>

      <div>
        <button
          type="submit"
          className="bg-orange-600 text-white rounded-md w-full text-center py-4 mt-6 flex gap-x-4 items-center justify-center"
          disabled={isPending}
        >
          {isSignup ? t("register") : t("login")}
          {isPending && <Loader className="w-5 h-5 animate-spin" />}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
