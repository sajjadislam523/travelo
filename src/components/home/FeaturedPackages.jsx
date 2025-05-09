import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loading from "../Loading";

const FeaturedPackages = () => {
    const axiosPublic = useAxiosPublic();

    const { data, isLoading } = useQuery({
        queryKey: ["packages"],
        queryFn: async () => {
            const res = await axiosPublic.get("/packages");
            return res.data;
        },
    });

    return (
        <div className=" relative px-8 py-4 bg-gray-300 flex items-center justify-center h-screen">
            <div>
                <h1 className="text-4xl font-bold text-center mb-8">
                    Our Featured Packages
                </h1>

                {isLoading ? (
                    <Loading />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {isLoading && <Loading />}
                        {data.length === 0 ? (
                            <div className="col-span-full text-center text-gray-500">
                                No Packages Available right now!
                            </div>
                        ) : (
                            data.map((packages) => (
                                <div
                                    key={packages._id}
                                    className="bg-white shadow-lg rounded-lg p-4"
                                >
                                    <img
                                        src={packages.image}
                                        alt={packages.name}
                                        className="w-full h-48 object-cover rounded-lg mb-4"
                                    />
                                    <h2 className="text-xl font-semibold">
                                        {packages.name}
                                    </h2>
                                    <p className="text-gray-600">
                                        {packages.description}
                                    </p>
                                    <p className="text-lg font-bold mt-2">
                                        ${packages.price}
                                    </p>
                                    <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
                                        Book Now
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeaturedPackages;
