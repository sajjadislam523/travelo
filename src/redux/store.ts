import { baseApi } from "@/redux/api/baseApi";
import { packagesApi } from "@/redux/api/packagesApi";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        package: packagesApi.reducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
