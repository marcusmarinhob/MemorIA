import { Navigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast"; 

const PrivateRoute = ({ children, allowedRoles}) => {
    const userType = localStorage.getItem("userType");

    if (!userType) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(userType)) {
        toast({
        title: "Acesso negado",
        description: "Você não tem acesso a essa página",
        variant: "destructive",
        });
        return <Navigate to="/" replace />;
    }
    return children;
};

export default PrivateRoute;