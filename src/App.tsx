import {useEffect} from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginForm from "./components/auth/LogIn";
import SignUpForm from "./components/auth/SignUp";
import Home from "./components/Home";
import { useAuthUser } from "./stores/useAuthUser";
import { UserType } from "./types/types";
import { Toaster } from "react-hot-toast";

function App() {
  const queryClient = new QueryClient();

  const { setUser, user } = useAuthUser();
  const storedUser = localStorage.getItem("auth_user");

  useEffect(() => {
    if (storedUser) {
      const authUser: UserType = JSON.parse(storedUser);
      setUser({ user: authUser });
    }
  }, [storedUser, setUser]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: user ? <Home /> : <Navigate to={"/login"} />,
    },
    {
      path: "/login",
      element: user ? <Navigate to={"/"} /> : <LoginForm />,
    },
    {
      path: "/signup",
      element: user ? <Navigate to={"/"} /> : <SignUpForm />,
    },
  ]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster position="bottom-right" reverseOrder />
      </QueryClientProvider>
    </>
  );
}

export default App;
