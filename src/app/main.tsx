import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "../pages/Auth.tsx";
import MainPage from "../pages/MainPage.tsx";
import Dashboard from "@src/app/layouts/Dashboard.tsx";
import Equipments from "../pages/Equipments.tsx";
import ManageAccess from "../pages/ManageAccess.tsx";
import BookingHistory from "../pages/BookingHistory.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import Departments from "../pages/Departments.tsx";
import Areas from "../pages/Areas.tsx";
import { AuthContextProvider } from "@src/app/context/AuthContext.tsx";
import { PrivateRoute } from "../shared/hoc/PrivateRoute.tsx";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import EquipmentDetail from "../pages/EquipmentDetail.tsx";
import CustomBreadcrumbs from "@src/shared/components/custom-breadcrumbs/custom-breadcrumbs.tsx";
import SideMenu from "@src/widgets/side-menu/SideMenu.tsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Auth />,
    },
    {
      path: "/dashboard",
      element: (
        <PrivateRoute>
          <Dashboard
            breadcrumbs={<CustomBreadcrumbs />}
            sideMenu={<SideMenu />}
          />
        </PrivateRoute>
      ),
      children: [
        {
          path: "equipments/:id",
          element: <EquipmentDetail />,
        },
        {
          path: "main",
          element: <MainPage />,
        },
        {
          path: "equipments/",
          element: <Equipments />,
        },
        {
          path: "areas",
          element: <Areas />,
        },
        {
          path: "departments",
          element: <Departments />,
        },
        {
          path: "manageAccess",
          element: <ManageAccess />,
        },
        {
          path: "historyBooking",
          element: <BookingHistory />,
        },
      ],
    },
  ],
  {}
);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <RouterProvider router={router} />
        </LocalizationProvider>
      </QueryClientProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
