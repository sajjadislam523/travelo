import Navbar from "@/components/Navbar";
import { Outlet } from "react-router";

const Mainlayout = () => {
    return (
        <div>
            <div className="absolute top-0 left-0 right-0 z-10">
                <Navbar />
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default Mainlayout;
