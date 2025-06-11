import { baseApi } from "@/redux/api/baseApi";
import { type PackageData } from "@/types/apiTypes";

export const packagesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        allPackages: builder.query<PackageData[], void>({
            query: () => ({ url: "/api/packages", method: "GET" }),
            providesTags: ["allPackages"],
        }),
        addPackage: builder.mutation<PackageData, FormData>({
            query: (data) => ({
                url: "/api/packages",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["allPackages"],
        }),
        updatePackage: builder.mutation<void, { id: string; data: FormData }>({
            query: ({ id, data }) => ({
                url: `/api/packages/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["allPackages"],
        }),
        deletePackage: builder.mutation<void, string>({
            query: (id) => ({
                url: `/api/packages/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["allPackages"],

            onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
                const patchResult = dispatch(
                    packagesApi.util.updateQueryData(
                        "allPackages",
                        undefined,
                        (draft) => {
                            return draft.filter((pkg) => pkg._id !== id);
                        }
                    )
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),
        getPackageById: builder.query<PackageData, string>({
            query: (id) => ({
                url: `/api/packages/${id}`,
                method: "GET",
            }),
        }),
    }),

    overrideExisting: false,
});

export const {
    useAllPackagesQuery,
    useAddPackageMutation,
    useUpdatePackageMutation,
    useDeletePackageMutation,
    useGetPackageByIdQuery,
} = packagesApi;
