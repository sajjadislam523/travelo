import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    useAddPackageMutation,
    useGetPackageByIdQuery,
    useUpdatePackageMutation,
} from "@/redux/api/packagesApi";
import type { PackageFormValues } from "@/types/apiTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { z } from "zod";

// Form validation schema with better error messages
const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    description: z
        .string()
        .min(10, "Description must be at least 10 characters"),
    price: z.coerce
        .number({
            invalid_type_error: "Price must be a number",
        })
        .positive("Price must be positive")
        .max(100000, "Price seems too high"),
    destination: z.string().min(2, "Destination must be at least 2 characters"),
    image: z
        .instanceof(File, {
            message: "Please select an image file",
        })
        .refine(
            (file) => file.size < 5000000,
            "File size must be less than 5MB"
        ),
});

type FormValues = z.infer<typeof formSchema>;

const AddPackages = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    const { data: packageData, isLoading: isFetching } = useGetPackageByIdQuery(
        id || "",
        {
            skip: !isEditMode,
        }
    );

    const [updatePackage] = useUpdatePackageMutation();

    const [addPackage, { isLoading, error }] = useAddPackageMutation();
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            destination: "",
            image: undefined,
        },
    });

    useEffect(() => {
        if (packageData) {
            form.setValue("name", packageData.name);
            form.setValue("description", packageData.description);
            form.setValue("destination", packageData.destination);
            form.setValue("price", packageData.price);
            setImagePreview(packageData?.image?.url);
        }
    }, [packageData]);

    const onSubmit = async (values: PackageFormValues) => {
        try {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("description", values.description);
            formData.append("price", values.price.toString());
            formData.append("destination", values.destination);
            formData.append("image", values.image);

            if (isEditMode && id) {
                await updatePackage({ id, data: formData }).unwrap();
                toast.success("Package updated successfully");
            } else {
                await addPackage(formData).unwrap();
                toast.success("Package added successfully");
            }

            form.reset();
            setImagePreview(null);
            navigate("/admin/packages");
        } catch (error) {
            console.error("Add package failed:", error);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setValue("image", file);
            form.clearErrors("image");

            // Create preview
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    if (isEditMode && isFetching) {
        return <Loading />;
    }

    return (
        <div className="px-4 py-8 max-w-3xl mx-auto">
            <div className="mb-8">
                <h1 className="font-jetbrains text-3xl font-bold mb-2">
                    Add Travel Package
                    {isEditMode ? "Edit Package" : "Add Travel Package"}
                </h1>
                <p className="text-gray-600">
                    Fill out the form below to add a new travel package to the
                    database
                </p>
            </div>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 bg-white p-6 rounded-lg border shadow-sm"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name field */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Package Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Summer Vacation Package"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Destination field */}
                        <FormField
                            control={form.control}
                            name="destination"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Destination</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Paris, France"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Description field */}
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Detailed package description..."
                                        rows={4}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Price field */}
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price (USD)</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                                $
                                            </span>
                                            <Input
                                                type="number"
                                                placeholder="299.99"
                                                className="pl-8"
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Image field */}
                        <FormField
                            control={form.control}
                            name="image"
                            render={({}) => (
                                <FormItem>
                                    <FormLabel>Package Image</FormLabel>
                                    <FormControl>
                                        <div>
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                            />
                                            <p className="text-xs text-gray-500 mt-1">
                                                JPG, PNG or WEBP. Max 5MB.
                                            </p>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Image Preview */}
                    {imagePreview && (
                        <div className="mt-4">
                            <p className="text-sm font-medium mb-2">
                                Image Preview:
                            </p>
                            <div className="border rounded-md p-2 w-64">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-full h-40 object-cover rounded-md"
                                />
                            </div>
                        </div>
                    )}

                    {/* Error message */}
                    {error && (
                        <div className="bg-red-50 p-3 rounded-md border border-red-200">
                            <p className="text-red-700 font-medium">
                                Failed to add package:{" "}
                                {"data" in error
                                    ? (error.data as any).message
                                    : "Unknown error"}
                            </p>
                        </div>
                    )}

                    {/* Submit button */}
                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            variant="outline"
                            type="button"
                            onClick={() => {
                                form.reset();
                                setImagePreview(null);
                            }}
                        >
                            Reset
                        </Button>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="min-w-[120px]"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    {isEditMode
                                        ? "Updating Package"
                                        : "Adding Package"}
                                </>
                            ) : isEditMode ? (
                                "Update Package"
                            ) : (
                                "Add Package"
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default AddPackages;
