import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from '../context/AuthProvider';
// export default function PrivateRoute(props) {
//     const { currentUser } = useAuth();
//     const {
//         model,
//         children,
//         ...rest // other props passed to the route
//     } = props;

//     return currentUser ? <div>{children}</div> : <Navigate to="/login" />
// }

const PrivateRoute= () => {
    const { currentUser } = useAuth();
    return currentUser ? <Outlet/> : <Navigate to="/login" />
}

export default PrivateRoute;