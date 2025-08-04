import { AnimatePresence, motion as Motion } from "framer-motion";

const Loading = ({ fullScreen = false }) => {
    return (
        <AnimatePresence>
            <Motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`${
                    fullScreen ? "fixed" : "absolute"
                } inset-0 backdrop-blur-sm flex items-center justify-center z-10`}
            >
                <Motion.svg
                    className="h-24 w-24"
                    viewBox="0 0 100 100"
                    animate={{
                        rotate: 360,
                        transition: {
                            repeat: Infinity,
                            duration: 1.2,
                            ease: "linear",
                        },
                    }}
                >
                    {/* Gradient Definition */}
                    <linearGradient
                        id="loading-gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                    >
                        <stop offset="0%" stopColor="#2b2a2a" />
                        <stop offset="100%" stopColor="#b5b3b3" />
                    </linearGradient>

                    {/* Animated Circle */}
                    <Motion.circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="url(#loading-gradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        initial={{ pathLength: 0.25 }}
                        animate={{
                            pathLength: [0.25, 1, 0.25],
                            rotate: [0, 180],
                        }}
                        transition={{
                            duration: 1.8,
                            ease: "easeInOut",
                            repeat: Infinity,
                        }}
                    />
                </Motion.svg>

                {/* Text Animation */}
                <Motion.span
                    className="absolute text-gray-600 dark:text-gray-300 font-semibold"
                    initial={{ y: 0 }}
                    animate={{
                        y: [-2, 2, -2],
                        transition: {
                            duration: 1.5,
                            repeat: Infinity,
                        },
                    }}
                >
                    Loading...
                </Motion.span>
            </Motion.div>
        </AnimatePresence>
    );
};

export default Loading;
