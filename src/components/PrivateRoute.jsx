import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles}) => {
    const userType = localStorage.getItem("userType");

    if (!userType) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(userType)) {
        return <Navigate to="/" replace />;
    }
    return children;
};

export default PrivateRoute;