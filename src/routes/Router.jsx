import React from "react";
import { Route, Routes } from "react-router";
import AdminLayout from "../layout/AdminLayout";
import AuthLayout from "../layout/AuthLayout";
import MainLayout from "../layout/MainLayout";
import Booking from "../pages/Booking";
import Checkout from "../pages/Checkout";
import CheckoutConfirm from "../pages/CheckoutConfirm";
import Home from "../pages/Home";
import PackageDetails from "../pages/PackageDetails";
import Packages from "../pages/Packages";
import About from "../pages/about/About";
import Contact from "../pages/about/Contact";
import Dashboard from "../pages/admin/Dashboard";
import AdminPackages from "../pages/admin/packages/AdminPackages";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import NotFound from "../pages/notfound/NotFound";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";

const Router = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="packages" element={<Packages />} />
                <Route path="packages/:id" element={<PackageDetails />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
            </Route>

            {/* Auth Routes */}
            <Route path="/auth" element={<AuthLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Route>

            {/* Private route */}
            <Route element={<PrivateRoute />}>
                <Route path="/booking/:id" element={<Booking />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/confirmation/:id" element={<CheckoutConfirm />} />
            </Route>

            {/* Admin route */}
            <Route element={<AdminRoute />}>
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="packages" element={<AdminPackages />} />
                    {/* <Route path="users" element={<AdminUsers />} /> */}
                    {/* <Route path="bookings" element={<AdminBookings />} /> */}
                    {/* <Route path="reviews" element={<AdminReviews />} /> */}
                    {/* <Route path="settings" element={<AdminSettings />} /> */}
                </Route>
            </Route>

            {/* 404 page */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default Router;
