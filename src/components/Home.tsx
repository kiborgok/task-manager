import Navbar from "./navbar/Navbar";
import Todos from "./todos/Todos";
import { useAuthUser } from "../stores/useAuthUser";
import { Navigate } from "react-router";

const Home = () => {
  const { user } = useAuthUser();

  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div>
      <div className="section_wrapper">
        <Navbar />
        <Todos />
      </div>
    </div>
  );
};

export default Home;