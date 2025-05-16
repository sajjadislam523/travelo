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
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";

import { z } from "zod";

// Define interface for form value
interface FormValues {
    name: string;
    description: string;
    price: number;
    destination: string;
    image: File;
}

// Type validation for the API response data
interface PackageData {
    name: string;
    description: string;
    price: number;
    destination: string;
    image: string;
    _id?: string;
}

// Form validation schema
const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    description: z
        .string()
        .min(10, "Description must be at least 10 characters"),
    price: z.coerce.number().positive("Price must be a positive number"),
    destination: z.string().min(2, "Destination must be at least 2 characters"),
    image: z.instanceof(File),
});

const AddPackages = () => {
    const axiosPublic = useAxiosPublic();

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

    const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;
    const cloud_name = import.meta.env.VITE_CLOUD_NAME;

    // console.log("here is the environment variables", upload_preset, cloud_name);

    // The honorable cloudinary upload system for this application!!🔥🍀 + 😵‍💫

    const uploadImage = async (file: File): Promise<string> => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", upload_preset);
        data.append("cloud_name", cloud_name);

        const res = await axios.post<{ secure_url: string }>(
            `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
            data
        );

        return res.data.secure_url;
    };

    // The Emperor from Tanstack-Query, The MUTATION!! who has the power to alter the data in the server, going to update the data in the DATABASE!!
    const { mutate, isPending } = useMutation<PackageData, Error, FormValues>({
        mutationFn: async (values) => {
            const imageUrl = await uploadImage(values.image);
            const packageData: PackageData = {
                name: values.name,
                description: values.description,
                price: values.price,
                destination: values.destination,
                image: imageUrl,
            };
            const res = await axiosPublic.post("/packages", packageData);
            return res.data;
        },
        onSuccess: () => {
            form.reset();
            // A toast notification should be here!!
        },
        onError: (error) => {
            console.error("Submission error", error);
        },
    });

    // And Finally!! the spark in a warehouse of gunpowder, the function that handles the form submission!!
    function formSubmit(values: FormValues) {
        mutate(values);
    }

    return (
        <div className="px-4 py-8 flex flex-col items-start gap-4 justify-center">
            <h1 className="font-jetbrains text-2xl font-bold mb-4">
                Add travel packages to the database.
            </h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(formSubmit)}
                    className="space-y-6"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Package Name</FormLabel>{" "}
                                <FormControl>
                                    <Input
                                        placeholder="Summer Vacation Package"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Detailed package description..."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="299.99"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

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

                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Package Image</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            field.onChange(e.target.files?.[0])
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" disabled={isPending}>
                        {isPending ? "Submitting..." : "Add Package"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default AddPackages;
