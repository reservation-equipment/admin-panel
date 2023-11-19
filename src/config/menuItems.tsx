import ComputerIcon from '@mui/icons-material/Computer';
import {ReactNode} from "react";
import History from "@mui/icons-material/History";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CameraOutdoorIcon from '@mui/icons-material/CameraOutdoor';

export type MenuItems = {
    path: string,
    label: string,
    link: string,
    icon: ReactNode,
}

export const rootPath = "/dashboard"

export const menuItems: MenuItems[] = [
    {
        path: "equipments",
        label: "Все оборудование",
        link: `${rootPath}/equipments`,
        icon: <ComputerIcon/>
    },
    {
        path: "areas",
        label: "Помещения",
        link: `${rootPath}/areas`,
        icon: <CameraOutdoorIcon/>
    },
    {
        path: "departments",
        label: 'Структурное подразделение',
        link: `${rootPath}/departments`,
        icon: <AccountBalanceIcon/>
    },
    {
        path: "historyBooking",
        label: "История бронирования",
        link: `${rootPath}/historyBooking`,
        icon: <History/>
    },
    {
        path: "manageAccess",
        label: "Управление доступами",
        link: `${rootPath}/manageAccess`,
        icon: <AdminPanelSettingsIcon/>
    },

]