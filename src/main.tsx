import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Auth from "./modules/Auth/Auth.tsx";
import MainPage from "./modules/MainPage/MainPage.tsx";
import Dashboard from "./modules/Layout/Dashboard.tsx";
import Equipments from "./modules/Equipments/Equipments.tsx";
import ManageAccess from "./modules/ManageAccess/ManageAccess.tsx";
import BookingHistory from "./modules/BookingHistory/BookingHistory.tsx";
import {QueryClient, QueryClientProvider} from "react-query";
import Departments from "./modules/Departments/Departments.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Auth/>,
    },
    {
        path: "/dashboard",
        element: <Dashboard/>,
        children: [
            {
                path: "main",
                element: <MainPage/>
            },
            {
                path: "equipments",
                element: <Equipments/>,
            },
            {
                path: "departments",
                element: <Departments/>,
            },
            {
                path: "manageAccess",
                element: <ManageAccess/>,
            },
            {
                path: "historyBooking",
                element: <BookingHistory/>,
            }
        ]

    },

]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
        </QueryClientProvider>
    </React.StrictMode>,
)
