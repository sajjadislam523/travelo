import { AnimatePresence, motion as Motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BsTwitter, BsYoutube } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { IoArrowDown, IoArrowForwardOutline } from "react-icons/io5";
import { Link } from "react-router";
import headerImage from "../../assets/images/header_img.jpg";

const iconWrapper = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    whileHover: { scale: 1.1, backgroundColor: "rgba(255,255,255,0.3)" },
    whileTap: { scale: 0.95, rotate: 5 },
    transition: { type: "spring", stiffness: 300, damping: 20 },
};

const heroTexts = [
    "Discover Your Next Adventure",
    "Explore Hidden Gems Worldwide",
    "Craft Memories That Last Forever",
    "Journey Beyond Boundaries",
];

const HeroSection = () => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);

    const scrollToNextSection = () => {
        const next = sectionRef.current?.nextElementSibling;
        if (next) {
            next.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTextIndex((prev) => (prev + 1) % heroTexts.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section
            ref={sectionRef}
            className="h-screen bg-cover bg-center flex items-center justify-center"
            style={{
                backgroundImage: `url(${headerImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="bg-black/30 absolute inset-0"></div>
            <div className="flex items-center justify-between w-full px-8 py-4 z-10 text-gray-100">
                <h1 className="font-jetbrains font-bold text-8xl">
                    <AnimatePresence mode="wait">
                        <Motion.span
                            key={currentTextIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            {heroTexts[currentTextIndex]}
                        </Motion.span>
                    </AnimatePresence>
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
            <div className="z-50 absolute bottom-10 left-1/2 transform -translate-x-1/2 flex items-center justify-between w-full max-w-[90%] mx-auto px-4">
                <Motion.button
                    className="rounded-full bg-white flex items-center gap-2 pl-4 text-black z-50 px-2 py-2 font-extralight"
                    whileHover={{ scale: 1.05, cursor: "pointer" }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "tween", stiffness: 300, damping: 20 }}
                >
                    Booking Now
                    <div className="p-2 rounded-full bg-black">
                        <IoArrowForwardOutline className="text-white -rotate-45" />
                    </div>
                </Motion.button>

                <Motion.p
                    onClick={scrollToNextSection}
                    className="text-white text-md font-jetbrains flex items-center gap-2 z-50"
                    whileHover={{ scale: 1.05, cursor: "pointer" }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        type: "tween",
                        stiffness: 400,
                        damping: 20,
                    }}
                    initial={{ opacity: 0, y: 20 }}
                >
                    Explore More <IoArrowDown />
                </Motion.p>
            </div>
        </section>
    );
};

export default HeroSection;
