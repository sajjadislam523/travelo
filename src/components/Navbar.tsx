import { motion } from "framer-motion";
import { Link, NavLink } from "react-router";

const navLinks = [
    { to: "/", label: "Home", minWidth: 60 },
    { to: "/packages", label: "Packages", minWidth: 68 },
    { to: "/about", label: "About", minWidth: 60 },
    { to: "/contact", label: "Contact", minWidth: 60 },
];
const Navbar = () => {
    return (
        <div className="flex justify-between items-center bg-transparent p-8 ">
            <Link to="/" className="text-xl font-bold ">
                <h1 className="font-jetbrains text-white">TRAVELO</h1>
            </Link>
            {/* <nav className="flex gap-4 font-inter">
                <MotionNavLink
                    whileHover={{
                        scale: 1.1,
                        textShadow: "0px 2px 6px rgba(255,255,255,0.4)",
                    }}
                    transition={{ type: "spring", stiffness: 150, damping: 15 }}
                    to="/"
                    className={({ isActive }) =>
                        `font-light inline-block transition-all ${
                            isActive
                                ? "text-white font-medium"
                                : "text-gray-200 font-light hover:font-medium hover:text-white"
                        }`
                    }
                >
                    <span className="block min-w-[60px] text-center">Home</span>
                </MotionNavLink>

                <MotionNavLink
                    whileHover={{
                        scale: 1.1,
                        textShadow: "0px 2px 6px rgba(255,255,255,0.4)",
                    }}
                    transition={{ type: "spring", stiffness: 180, damping: 15 }}
                    to="/packages"
                    className={({ isActive }) =>
                        `font-light inline-block transition-all ${
                            isActive
                                ? "text-white font-medium"
                                : "text-gray-200 font-light hover:font-medium hover:text-white"
                        }`
                    }
                >
                    <span className="block min-w-[68px] text-center">
                        Packages
                    </span>
                </MotionNavLink>

                <MotionNavLink
                    whileHover={{
                        scale: 1.1,
                        textShadow: "0px 2px 6px rgba(255,255,255,0.4)",
                    }}
                    transition={{ type: "spring", stiffness: 180, damping: 15 }}
                    to="/about"
                    className={({ isActive }) =>
                        `font-light inline-block transition-all ${
                            isActive
                                ? "text-white font-medium"
                                : "text-gray-200 font-light hover:font-medium hover:text-white"
                        }`
                    }
                >
                    <span className="block min-w-[60px] text-center">
                        About
                    </span>
                </MotionNavLink>

                <MotionNavLink
                    whileHover={{
                        scale: 1.1,
                        textShadow: "0px 2px 6px rgba(255,255,255,0.4)",
                    }}
                    transition={{ type: "spring", stiffness: 180, damping: 15 }}
                    to="/contact"
                    className={({ isActive }) =>
                        `font-light inline-block transition-all ${
                            isActive
                                ? "text-white font-medium"
                                : "text-gray-200 font-light hover:font-medium hover:text-white"
                        }`
                    }
                >
                    <span className="block min-w-[60px] text-center">
                        Contact
                    </span>
                </MotionNavLink>
            </nav> */}
            <nav className="flex gap-4 font-inter">
                {navLinks.map(({ to, label, minWidth }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            `inline-block transition-colors duration-200 ${
                                isActive ? "text-white" : "text-gray-200"
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <motion.span
                                initial={false}
                                whileHover={{
                                    scale: 1.08,
                                    textShadow:
                                        "0 2px 6px rgba(255,255,255,0.4)",
                                }}
                                whileTap={{ scale: 0.98 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 160,
                                    damping: 18,
                                }}
                                className="block text-center"
                                style={{
                                    minWidth: `${minWidth}px`,
                                    fontWeight: isActive ? 500 : 300,
                                    transition: "font-weight 0.2s ease",
                                }}
                            >
                                {label}
                            </motion.span>
                        )}
                    </NavLink>
                ))}
            </nav>
            <div>
                <h1>USER</h1>
            </div>
        </div>
    );
};

export default Navbar;
