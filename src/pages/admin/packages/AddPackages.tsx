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
import { useAddPackageMutation } from "@/redux/api/packagesApi";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";

import { z } from "zod";

// Form validation schema
const formSchema = z.object({
    name: z.string().min(2),
    description: z.string().min(10),
    price: z.coerce.number().positive(),
    destination: z.string().min(2),
    image: z.instanceof(File),
});

type FormValues = z.infer<typeof formSchema>;

type AddPackageError = {
    data: {
        message: string;
    };
};

// The honorable cloudinary upload system for this application!!🔥🍀 + 😵‍💫

const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;
const cloud_name = import.meta.env.VITE_CLOUD_NAME;

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

const AddPackages = () => {
    const [addPackage, { isLoading, error }] = useAddPackageMutation();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (values: FormValues) => {
        try {
            const imageUrl = await uploadImage(values.image);

            await addPackage({
                name: values.name,
                description: values.description,
                price: values.price,
                destination: values.destination,
                image: imageUrl,
            }).unwrap();
            form.reset();
        } catch (error) {
            console.error("Add package failed:", error);
        }
    };

    return (
        <div className="px-4 py-8 flex flex-col items-start gap-4 justify-center">
            <h1 className="font-jetbrains text-2xl font-bold mb-4">
                Add travel packages to the database.
            </h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    {/* Name field */}
                    <FormField<FormValues>
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Package Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Summer Vacation"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField<FormValues>
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

                    <FormField<FormValues>
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

                    <FormField<FormValues>
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

                    <FormField<FormValues>
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
                    {error && (
                        <p className="text-red-500">
                            {(error as AddPackageError).data?.message}
                        </p>
                    )}

                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Submitting..." : "Add Package"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default AddPackages;
