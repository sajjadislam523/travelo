import { Link, NavLink } from "react-router";

const Sidebar = () => {
    return (
        <div className="w-1/4 h-screen bg-gray-800 text-white flex flex-col items-center justify-center">
            <div className="w-full h-full p-8">
                <h1 className="font-jetbrains text-xl mb-8 border-b py-2">
                    <Link to="/admin">Travelo</Link>
                </h1>
                <ul>
                    <li className="mb-4 ">
                        <NavLink
                            className={({ isActive }) =>
                                `font-inter ${
                                    isActive
                                        ? "text-white underline"
                                        : "text-gray-200"
                                }`
                            }
                            to="/admin/packages"
                        >
                            Packages
                        </NavLink>
                    </li>
                    <li className="mb-4 ">
                        <NavLink
                            className={({ isActive }) =>
                                `font-inter ${
                                    isActive
                                        ? "text-white underline"
                                        : "text-gray-200"
                                }`
                            }
                            to="/admin/bookings"
                        >
                            Bookings
                        </NavLink>
                    </li>
                    <li className="mb-4 ">
                        <NavLink
                            className={({ isActive }) =>
                                `font-inter ${
                                    isActive
                                        ? "text-white underline"
                                        : "text-gray-200"
                                }`
                            }
                            to="/admin/users"
                        >
                            Users
                        </NavLink>
                    </li>
                    <li className="mb-4 ">
                        <NavLink
                            className={({ isActive }) =>
                                `font-inter ${
                                    isActive
                                        ? "text-white underline"
                                        : "text-gray-200"
                                }`
                            }
                            to="/admin/settings"
                        >
                            Settings
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
