import { useLocation, Navigate } from "react-router-dom";
import useAuth from "../hook/useAuth";

const RequireAuth = ({children}) => {
    const location = useLocation();
    

    const {role} = useAuth();

    if(!role){
        return <Navigate to='/login' state={{from: location}}/>
    }

    return children;

}

export default RequireAuth;