import { Link, NavLink } from "react-router";

const Navbar = () => {
    return (
        <div className="flex justify-between items-center bg-transparent p-8 ">
            <Link to="/" className="text-xl font-bold ">
                <h1 className="font-jetbrains text-white">TRAVELO</h1>
            </Link>
            <nav className="flex gap-4 font-inter">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `hover:text-gray-100 font-light transition-colors ${
                            isActive ? "text-white" : "text-gray-200"
                        }`
                    }
                >
                    Home
                </NavLink>

                <NavLink
                    to="/packages"
                    className={({ isActive }) =>
                        `hover:text-gray-100 font-light transition-colors ${
                            isActive ? "text-white" : "text-gray-200"
                        }`
                    }
                >
                    Packages
                </NavLink>

                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        `hover:text-gray-100 font-light transition-colors ${
                            isActive ? "text-white" : "text-gray-200"
                        }`
                    }
                >
                    About
                </NavLink>

                <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                        `hover:text-gray-100 font-light transition-colors ${
                            isActive ? "text-white" : "text-gray-200"
                        }`
                    }
                >
                    Contact
                </NavLink>
            </nav>
            <div>
                <h1>USER</h1>
            </div>
        </div>
    );
};

export default Navbar;
