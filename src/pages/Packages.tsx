import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { useAllPackagesQuery } from "@/redux/api/packagesApi";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const heroMessages = [
    "Explore breathtaking destinations around the world.",
    "Unforgettable journeys tailored for you.",
    "Adventure, luxury, and culture — all in one trip.",
    "Your dream vacation starts here with our best packages!",
];

const Packages = () => {
    const { data, isLoading, error } = useAllPackagesQuery();
    const plugin = useRef(Autoplay({ delay: 3500 }));

    return (
        <div className=" min-h-screen">
            {/* Hero Banner with Sliding Messages */}
            <div className="w-full py-16 h-[60vh] flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 text-white shadow-lg">
                <Carousel
                    plugins={[plugin.current]}
                    className="max-w-2xl mx-auto"
                >
                    <CarouselContent>
                        {heroMessages.map((msg, index) => (
                            <CarouselItem key={index}>
                                <div className="text-center text-2xl md:text-4xl font-bold px-4 tracking-wide">
                                    {msg}
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>

            {/* Package Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 max-w-6xl mx-auto">
                {isLoading ? (
                    <div className="col-span-full text-center">
                        Loading packages...
                    </div>
                ) : error ? (
                    <div className="col-span-full text-red-400 text-center">
                        Failed to load packages
                    </div>
                ) : (
                    data?.map((pkg) => (
                        <Card
                            key={pkg._id}
                            className="bg-white text-gray-800 shadow-xl hover:shadow-2xl transition-transform transform hover:scale-[1.03] rounded-xl border border-gray-200"
                        >
                            <CardHeader>
                                <img
                                    className="w-full h-48 object-cover rounded-lg"
                                    src={pkg.image.url}
                                    alt="package image"
                                />
                                <CardTitle className="text-xl font-semibold mt-2">
                                    {pkg.name}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 text-sm mb-2 line-clamp-3">
                                    {pkg.description}
                                </p>
                                <p className="text-indigo-600 text-sm mb-1 font-medium">
                                    Destination: {pkg.destination}
                                </p>
                                <p className="text-lg font-bold text-teal-600">
                                    ${pkg.price}
                                </p>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default Packages;
