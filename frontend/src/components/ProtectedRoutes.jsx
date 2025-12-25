import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const ProtectedRoute= ({ children}) =>{
    const {user} = useAuth();
    //if no user, redirect to login
    return user? children : <Navigate to="/login"/>;
};

export default ProtectedRoute;