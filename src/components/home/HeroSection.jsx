import { motion } from "motion/react";
import React from "react";
import { BsTwitter, BsYoutube } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import headerImage from "../../assets/images/header_img.jpg";

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
                <div className="flex gap-8 flex-col">
                    {/* Facebook */}
                    <motion.a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg border rounded-full p-2"
                        whileHover={{
                            scale: 1.1,
                            backgroundColor: "#f3f4f6",
                            color: "#000",
                            transition: { duration: 0.3 },
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaFacebook />
                    </motion.a>

                    {/* Twitter */}
                    <motion.a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg border rounded-full p-2"
                        whileHover={{
                            scale: 1.1,
                            backgroundColor: "#f3f4f6",
                            color: "#000",
                            transition: { duration: 0.3 },
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <BsTwitter />
                    </motion.a>

                    {/* YouTube */}
                    <motion.a
                        href="https://youtube.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg border rounded-full p-2"
                        whileHover={{
                            scale: 1.1,
                            backgroundColor: "#f3f4f6",
                            color: "#000",
                            transition: { duration: 0.3 },
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <BsYoutube />
                    </motion.a>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
