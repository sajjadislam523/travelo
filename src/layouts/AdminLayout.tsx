import { Outlet } from "react-router";
import Sidebar from "../pages/admin/Sidebar";

const AdminLayout = () => {
    return (
        <div className="flex bg-gray-200">
            {/* Add flex container */}
            <Sidebar />
            <div className="flex-1">
                {/* Content area */}
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
