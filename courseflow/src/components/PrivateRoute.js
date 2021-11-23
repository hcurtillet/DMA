import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from '../context/AuthProvider';

export default function PrivateRoute(props) {
    const { currentUser } = useAuth();
    const {
        model,
        children,
        ...rest // other props passed to the route
    } = props;

    return currentUser ? children : <Navigate to="/login" />
}