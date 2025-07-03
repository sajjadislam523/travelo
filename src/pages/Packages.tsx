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
            <div className="w-full py-12 h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-800">
                <Carousel
                    plugins={[plugin.current]}
                    className="max-w-2xl mx-auto"
                >
                    <CarouselContent>
                        {heroMessages.map((msg, index) => (
                            <CarouselItem key={index}>
                                <div className="text-center text-2xl md:text-3xl font-semibold px-4 border">
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
                            className="bg-gray-900 text-white shadow-xl hover:scale-[1.02] transition-transform"
                        >
                            <CardHeader>
                                <CardTitle className="text-xl">
                                    {pkg.name}
                                </CardTitle>
                                <img
                                    className="w-full h-48 object-cover rounded-xl"
                                    src={pkg.image.url}
                                    alt="package image"
                                />
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-300 text-sm mb-2">
                                    {pkg.description}
                                </p>
                                <p className="text-gray-400 text-sm">
                                    Destination: {pkg.destination}
                                </p>
                                <p className="text-white font-bold mt-2">
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
