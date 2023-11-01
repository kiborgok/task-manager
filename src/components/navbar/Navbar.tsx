import { LogOut } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between">
      <h1 className="text-xl text-white uppercase font-bold">
        Task<span className="text-orange-600">Manager</span>
      </h1>

      <button className="bg-orange-100 p-2 rounded-md">
        <LogOut className="stroke-orange-600" />
      </button>
    </nav>
  );
};

export default Navbar;
