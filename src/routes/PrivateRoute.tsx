import type { ReactNode } from "react";

interface PrivateRouteProps {
    children?: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    return <div>{children} </div>;
};

export default PrivateRoute;
