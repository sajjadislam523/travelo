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
import { useAddPackageMutation } from "@/redux/api/packagesApi";
import type { PackageFormValues } from "@/types/apiTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
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
    const [addPackage, { isLoading, error }] = useAddPackageMutation();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    // const [uploadStatus, setUploadStatus] = useState<
    //     "idle" | "uploading" | "success" | "error"
    // >("idle");

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

    const onSubmit = async (values: PackageFormValues) => {
        try {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("description", values.description);
            formData.append("price", values.price.toString());
            formData.append("destination", values.destination);
            formData.append("image", values.image);

            await addPackage(formData).unwrap();

            form.reset();
            setImagePreview(null);
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

    return (
        <div className="px-4 py-8 max-w-3xl mx-auto">
            <div className="mb-8">
                <h1 className="font-jetbrains text-3xl font-bold mb-2">
                    Add Travel Package
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
                                    Adding...
                                </>
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
