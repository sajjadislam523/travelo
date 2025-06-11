import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    useAllPackagesQuery,
    useDeletePackageMutation,
} from "@/redux/api/packagesApi";
import type { PackageData } from "@/types/apiTypes";
import {
    Loader2,
    PencilIcon,
    PlusCircleIcon,
    SearchIcon,
    Trash2Icon,
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";

const AdminPackages = () => {
    const { data, isLoading, error } = useAllPackagesQuery();
    const [searchTerm, setSearchTerm] = useState("");
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [deletePackage, { isLoading: isDeleting }] =
        useDeletePackageMutation();

    const handleDelete = async (id: string) => {
        setDeletingId(id);

        try {
            await deletePackage(id).unwrap();
            toast.success("Package deleted successfully");
        } catch (error) {
            toast.error("Failed to delete package");
        } finally {
            setDeletingId(null);
        }
    };

    if (error)
        return (
            <div className="text-red-500 p-4">
                Error loading packages. Please try again later.
            </div>
        );

    const filteredPackages =
        data?.filter(
            (pkg) =>
                pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                pkg.description.toLowerCase().includes(searchTerm.toLowerCase())
        ) || [];

    return (
        <div className="px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div className="font-jetbrains">
                    <h1 className="text-2xl font-bold">Package Management</h1>
                    <p className="text-gray-500 mt-1">
                        {data?.length ?? 0 > 0
                            ? `${data?.length ?? 0} Package${
                                  (data?.length ?? 0) > 1 ? "s" : ""
                              } Available`
                            : ""}
                    </p>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                    <div className="relative w-full md:w-64">
                        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search packages..."
                            className="pl-10 font-jetbrains"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <Button asChild>
                        <a
                            href="/admin/packages/add"
                            className="flex items-center gap-2"
                        >
                            <PlusCircleIcon className="h-4 w-4" />
                            Add Package
                        </a>
                    </Button>
                </div>
            </div>

            {isLoading ? (
                <Loading />
            ) : filteredPackages.length === 0 ? (
                <div className="border rounded-lg p-8 text-center">
                    <div className="text-gray-500 font-jetbrains mb-4">
                        {searchTerm ? (
                            <>
                                No packages found matching "
                                <span className="font-semibold">
                                    {searchTerm}
                                </span>
                                "
                            </>
                        ) : (
                            "No packages available. Start by adding your first package."
                        )}
                    </div>
                    <Button asChild>
                        <a href="/admin/packages/add">Add Your First Package</a>
                    </Button>
                </div>
            ) : (
                <div className="border rounded-lg overflow-hidden">
                    <Table>
                        <TableHeader className="bg-gray-50">
                            <TableRow>
                                <TableHead className="w-[200px]">
                                    Package Name
                                </TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="w-[120px] text-right">
                                    Price
                                </TableHead>
                                <TableHead className="w-[140px]">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredPackages.map(
                                (packageItem: PackageData) => (
                                    <TableRow
                                        key={packageItem._id}
                                        className="hover:bg-gray-50"
                                    >
                                        <TableCell className="font-medium">
                                            <div className="font-semibold">
                                                {packageItem.name}
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                ID: {packageItem._id}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div
                                                className="truncate max-w-[200px] text-xs"
                                                title={packageItem.description}
                                            >
                                                {packageItem.description
                                                    .length > 80
                                                    ? packageItem.description.substring(
                                                          0,
                                                          80
                                                      ) + "..."
                                                    : packageItem.description}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right font-semibold">
                                            ${packageItem.price.toFixed(2)}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    asChild
                                                >
                                                    <a
                                                        href={`/admin/packages/edit/${packageItem._id}`}
                                                    >
                                                        <PencilIcon className="h-4 w-4" />
                                                    </a>
                                                </Button>
                                                <Button
                                                    className="cursor-pointer"
                                                    disabled={
                                                        isDeleting &&
                                                        deletingId ===
                                                            packageItem._id
                                                    }
                                                    onClick={() =>
                                                        handleDelete(
                                                            packageItem._id
                                                        )
                                                    }
                                                    variant="destructive"
                                                    size="icon"
                                                >
                                                    {isDeleting &&
                                                    deletingId ===
                                                        packageItem._id ? (
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                    ) : (
                                                        <Trash2Icon className="h-4 w-4" />
                                                    )}
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            )}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
};

export default AdminPackages;
