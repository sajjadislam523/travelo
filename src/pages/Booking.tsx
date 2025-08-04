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
import { useCreateBookingMutation } from "@/redux/api/bookingApi";
import { useGetPackageByIdQuery } from "@/redux/api/packagesApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { z } from "zod";

const bookingSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(6, "Enter a valid phone number"),
    travelDate: z.string().min(1, "Select a date"),
    notes: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

const Booking = () => {
    const { id } = useParams();
    const { data: pkg, isLoading } = useGetPackageByIdQuery(id || "");
    const [createBooking, { isLoading: isSubmitting }] =
        useCreateBookingMutation();

    const form = useForm<BookingFormValues>({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            travelDate: "",
            notes: "",
        },
    });

    const onSubmit = async (values: BookingFormValues) => {
        try {
            await createBooking({ ...values, packageId: id }).unwrap();
            toast.success("Booking successful!");
            form.reset();
        } catch (error) {
            toast.error("Failed to book. Try again later.");
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-2">{pkg?.name}</h1>
            <p className="text-gray-500 mb-6">{pkg?.description}</p>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6 bg-white border rounded-lg p-6 shadow-md"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="you@example.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="tel"
                                            placeholder="+123456789"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="travelDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Travel Date</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Additional Notes</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Anything you'd like us to know..."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full"
                    >
                        {isSubmitting ? "Booking..." : "Confirm Booking"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default Booking;
