import SideMenu from "./components/SideMenu/SideMenu.tsx";
import {Link, Outlet, useLocation} from "react-router-dom";
import {Breadcrumbs} from "@mui/material";
import {useMemo} from "react";
import {menuItems} from "../../config/menuItems.tsx";

const Dashboard = () => {
    const location = useLocation();
    const breadcrumbsList = location.pathname.split("/")

    const renderBreadcrumbsList = useMemo(() => {
        return breadcrumbsList.map((route: string, ix: number) => {
            if (route.match(/^\d+$/)) {
                return {
                    label: route,
                    link: `/dashboard/equipments/${route}`
                }
            } else {
                return {
                    label: menuItems.find((item) => item.path === route)?.label,
                    link: breadcrumbsList.slice(0, ix + 1).join("/")
                }
            }
        }).slice(1)
    }, [breadcrumbsList]);

    return (
        <div className={"flex"}>
            <SideMenu/>
            <div className={"w-full mt-8"} style={{
                marginLeft: 350,
            }}>
                <Breadcrumbs className={"w-auto pb-6"}>
                    {renderBreadcrumbsList.map((route: any, ix: number, arr: any) => {
                        if (arr.length - 1 == ix) {
                            return <p key={ix}>
                                {route.label}
                            </p>
                        } else {
                            return <Link key={ix} color="inherit" to={route.link}>
                                {route.label}
                            </Link>
                        }

                    })}
                </Breadcrumbs>
                <div className={"container"}>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
