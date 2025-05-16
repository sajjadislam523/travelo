import type { PackageState } from "@/types/apiTypes";
import { createSlice } from "@reduxjs/toolkit";

const initialState: PackageState = {
    _id: 0,
    name: "",
    description: "",
    price: 0,
    destination: "",
    image: "",
};

export const packageSlice = createSlice({
    name: "package",
    initialState,
    reducers: {},
});
