import { motion as Motion } from "framer-motion";
import React from "react";
import { BsTwitter, BsYoutube } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router";
import headerImage from "../../assets/images/header_img.jpg";

const iconWrapper = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    whileHover: { scale: 1.1, backgroundColor: "rgba(255,255,255,0.3)" },
    whileTap: { scale: 0.95, rotate: 5 },
    transition: { type: "spring", stiffness: 300, damping: 20 },
};

const HeroSection = () => {
    return (
        <div
            className="h-screen bg-cover bg-center flex items-center justify-center"
            style={{
                backgroundImage: `url(${headerImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="bg-black/30 absolute inset-0"></div>
            <div className="flex items-center justify-between w-full px-8 py-4 z-10 text-gray-100">
                <h1 className="font-jetbrains font-bold text-4xl">
                    This is hero section
                </h1>
                <div className="flex gap-6 flex-col">
                    {/* Facebook */}
                    <Link to="https://facebook.com" target="_blank">
                        <Motion.div
                            className="border p-2 rounded-full"
                            {...iconWrapper}
                        >
                            <FaFacebook className="text-xl" />
                        </Motion.div>
                    </Link>

                    {/* Twitter */}
                    <Link to="https://twitter.com" target="_blank">
                        <Motion.div
                            {...iconWrapper}
                            className="border p-2 rounded-full"
                        >
                            <BsTwitter className="text-xl" />
                        </Motion.div>
                    </Link>

                    {/* YouTube */}
                    <Link to="https://youtube.com" target="_blank">
                        <Motion.div
                            {...iconWrapper}
                            className="border p-2 rounded-full"
                        >
                            <BsYoutube className="text-xl" />
                        </Motion.div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
