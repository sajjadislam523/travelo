import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL || "http://localhost:5000",
    }),
    endpoints: () => ({}),
    tagTypes: ["allPackages"],
});
