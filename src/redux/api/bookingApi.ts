import { baseApi } from "@/redux/api/baseApi";

export const bookingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBookingById: builder.query({
            query: (id) => ({
                url: `/api/bookings/${id}`,
                method: "GET",
            }),
            providesTags: ["Booking"],
        }),
        createBooking: builder.mutation({
            query: (bookingData) => ({
                url: "/api/bookings",
                method: "POST",
                body: bookingData,
            }),
            invalidatesTags: ["Booking", "allPackages"],
        }),
        getBookingsByUserId: builder.query({
            query: (userId) => ({
                url: `/api/bookings/user/${userId}`,
                method: "GET",
            }),
            providesTags: ["Booking"],
        }),
        getAllBookings: builder.query({
            query: () => ({
                url: "/api/bookings",
                method: "GET",
            }),
            providesTags: ["Booking"],
        }),
        updateBooking: builder.mutation({
            query: ({ id, ...bookingData }) => ({
                url: `/api/bookings/${id}`,
                method: "PUT",
                body: bookingData,
            }),
            invalidatesTags: ["Booking"],
        }),
        deleteBooking: builder.mutation({
            query: (id) => ({
                url: `/api/bookings/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Booking", "allPackages"],
        }),
    }),
});

export const {
    useGetBookingByIdQuery,
    useCreateBookingMutation,
    useGetBookingsByUserIdQuery,
    useGetAllBookingsQuery,
    useUpdateBookingMutation,
    useDeleteBookingMutation,
} = bookingApi;
