import { baseApi } from "@/redux/api/baseApi";
import { type PackageData } from "@/types/apiTypes";

export const packagesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        allPackages: builder.query<PackageData[], void>({
            query: () => ({ url: "/packages", method: "GET" }),
        }),
        addPackage: builder.mutation<PackageData, Partial<PackageData>>({
            query: (data) => ({
                url: "/packages",
                method: "POST",
                body: data,
            }),
        }),
    }),

    overrideExisting: false,
});

export const { useAllPackagesQuery, useAddPackageMutation } = packagesApi;
