import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServiceListing from "./modules/Service/ServiceListing";
import Login from "./modules/Auth/Login";
import Home from "./modules/Home/Home";
import MainLayout from "./modules/MainLayout";
import CreateService from "./modules/Service/CreateService";
import ServiceDetails from "./modules/Service/ServiceDetails";
import { useDispatch, useSelector } from "react-redux";
import AdminRoute from "./modules/Auth/AdminRoute";
import "./App.css";
import { useEffect } from "react";
import { fetchUserProfile } from "./redux/features/authSlice";
import Dashboard from "./modules/Dashboard/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "services", element: <ServiceListing /> },
      { path: "service/:id", element: <ServiceDetails /> },
      { path: "book/:serviceId", element: <ServiceDetails /> },
    ],
  },
  {
    path: "/dashboard",
    element: <AdminRoute />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "create-service", element: <CreateService /> },
    ],
  },
  { path: "/login", element: <Login /> },
]);

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user && isAuthenticated) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, isAuthenticated, user]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
