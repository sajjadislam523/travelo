import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { useGetPackageByIdQuery } from "@/redux/api/packagesApi";
import { useNavigate, useParams } from "react-router";

const PackageDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: pkg, isLoading, error } = useGetPackageByIdQuery(id || "");

    if (isLoading) return <Loading />;
    if (error)
        return <div className="text-red-500">Failed to load package.</div>;

    return (
        <div className="px-6 py-16 h-screen flex items-center gap-10">
            <div className="flex-shrink-0">
                <h1 className="text-3xl font-bold mb-2">{pkg?.name}</h1>
                <img
                    src={pkg?.image?.url}
                    alt={pkg?.name}
                    className="w-80 h-80 object-cover rounded mb-4"
                />
            </div>
            <div className="flex-1">
                <p className="text-gray-700 mb-4">{pkg?.description}</p>
                <p className="text-lg font-semibold">Price: ${pkg?.price}</p>
                <p className="text-sm text-gray-500 mb-6">
                    Destination: {pkg?.destination}
                </p>
                <Button onClick={() => navigate(`/booking/${id}`)}>
                    Book Now
                </Button>
            </div>
        </div>
    );
};

export default PackageDetails;
