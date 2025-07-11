import Mainlayout from "@/layouts/Mainlayout";
import { Route, Routes } from "react-router";
import React, { Suspense, lazy } from "react";
import Loading from "@/components/Loading"; // Assuming you have a Loading component

// Layouts
const AdminLayout = lazy(() => import("@/layouts/AdminLayout"));
const AuthLayout = lazy(() => import("@/layouts/AuthLayout"));

// Pages
const Home = lazy(() => import("@/pages/Home"));
const Packages = lazy(() => import("@/pages/Packages"));
const PackageDetails = lazy(() => import("@/pages/PackageDetails"));
const About = lazy(() => import("@/pages/about/About"));
const Contact = lazy(() => import("@/pages/contact/Contact"));
const Login = lazy(() => import("@/pages/auth/Login"));
const Register = lazy(() => import("@/pages/auth/Register"));
const Booking = lazy(() => import("@/pages/Booking"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const CheckoutConfirm = lazy(() => import("@/pages/CheckoutConfirm"));
const Dashboard = lazy(() => import("@/pages/admin/Dashboard"));
const AdminBooking = lazy(() => import("@/pages/admin/booking/AdminBooking"));
const AddPackages = lazy(() => import("@/pages/admin/packages/AddPackages"));
const AdminPackages = lazy(() => import("@/pages/admin/packages/AdminPackages"));
const NotFound = lazy(() => import("@/pages/notfound/NotFound"));

// Route Guards
import AdminRoute from "@/routes/AdminRoute";
import PrivateRoute from "@/routes/PrivateRoute";

const Router = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Mainlayout />}>
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
                        <Route path="packages">
                            <Route index element={<AdminPackages />} />
                            <Route path="add" element={<AddPackages />} />
                            <Route path="edit/:id" element={<AddPackages />} />
                        </Route>
                        <Route path="bookings" element={<AdminBooking />} />
                    </Route>
                </Route>

                {/* 404 page */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
};

export default Router;
