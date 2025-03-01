import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, logout } from "../../redux/features/authSlice";

const Dashboard = () => {
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!user && isAuthenticated) {
            dispatch(fetchUserProfile()); // Fetch profile if user is missing
        }
    }, [dispatch, user, isAuthenticated]);

    if (!isAuthenticated) {
        return <p>You need to log in</p>;
    }

    return (
        <div>
            <h2>Welcome, {user?._id || "User"}!</h2>
            <p>Email: {user?.phoneNumber}</p>
            <button onClick={() => dispatch(logout())}>Logout</button>
        </div>
    );
};

export default Dashboard;
