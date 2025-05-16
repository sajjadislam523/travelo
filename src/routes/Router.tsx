import Mainlayout from "@/layouts/Mainlayout";
import { Route, Routes } from "react-router";

import AdminLayout from "@/layouts/AdminLayout";
import AuthLayout from "@/layouts/AuthLayout";
import Booking from "@/pages/Booking";
import Checkout from "@/pages/Checkout";
import CheckoutConfirm from "@/pages/CheckoutConfirm";
import Home from "@/pages/Home";
import PackageDetails from "@/pages/PackageDetails";
import Packages from "@/pages/Packages";
import About from "@/pages/about/About";
import Contact from "@/pages/about/Contact";
import Dashboard from "@/pages/admin/Dashboard";
import AddPackages from "@/pages/admin/packages/AddPackages";
import AdminPackages from "@/pages/admin/packages/AdminPackages";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import NotFound from "@/pages/notfound/NotFound";
import AdminRoute from "@/routes/AdminRoute";
import PrivateRoute from "@/routes/PrivateRoute";

const Router = () => {
    return (
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

                    {/* Route for packages for admin */}
                    <Route path="packages">
                        <Route index element={<AdminPackages />} />
                        <Route path="add" element={<AddPackages />} />
                    </Route>

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
