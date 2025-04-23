import { Button } from "@/components/ui/button";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading";

const AdminPackages = () => {
    const axiosPublic = useAxiosPublic();

    const { data: packages = [], isLoading } = useQuery({
        queryKey: ["packages"],
        queryFn: async () => {
            const res = await axiosPublic.get("/packages");
            return res.data;
        },
    });

    return (
        <div className="px-4 py-8 flex flex-col items-start gap-4 justify-center">
            <h1 className="font-jetbrains text-2xl font-bold">
                All of the packages
            </h1>
            <div>
                {packages.length === 0 ? (
                    <div className=" text-center text-gray-500 font-jetbrains">
                        Packages are not uploaded yet! Please add some packages.
                    </div>
                ) : (
                    <table className="w-full mt-4 border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">
                                    Name
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    Description
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    Price
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {packages.map((packageItem) => (
                                <tr key={packageItem._id}>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {packageItem.name}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {packageItem.description}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        ${packageItem.price}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                {isLoading && <Loading />}

                <Button variant="link" className="font-inter p-0">
                    <a href="/admin/packages/add">Add Package</a>
                </Button>
            </div>
        </div>
    );
};

export default AdminPackages;
