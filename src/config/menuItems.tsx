import ComputerIcon from '@mui/icons-material/Computer';
import {ReactNode} from "react";
import History from "@mui/icons-material/History";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

export type MenuItems = {
    label: string,
    link: string,
    icon: ReactNode,
}

export const rootPath = "/dashboard"

export const menuItems: MenuItems[] = [
    {
        label: "Все оборудование",
        link: `${rootPath}/equipments`,
        icon: <ComputerIcon/>
    },
    {
        label: 'Структурное подразделение',
        link: `${rootPath}/departments`,
        icon: <AccountBalanceIcon/>
    },
    {
        label: "История бронирования",
        link: `${rootPath}/historyBooking`,
        icon: <History/>
    },
    {
        label: "Управление доступами",
        link: `${rootPath}/manageAccess`,
        icon: <AdminPanelSettingsIcon/>
    },

]