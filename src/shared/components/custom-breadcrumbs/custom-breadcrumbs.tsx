import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { menuItems } from "@src/app/config/menuItems.tsx";
import { Breadcrumbs } from "@mui/material";

type RouteBreadcrumbs = {
  label: string;
  link: string;
};

const CustomBreadcrumbs = () => {
  const location = useLocation();
  const breadcrumbsList = location.pathname.split("/");

  const renderBreadcrumbsList = useMemo(() => {
    return breadcrumbsList
      .map((route: string, ix: number) => {
        if (route.match(/^\d+$/)) {
          return {
            label: route,
            link: `/dashboard/equipments/${route}`,
          };
        } else {
          return {
            label: menuItems.find((item) => item.path === route)?.label,
            link: breadcrumbsList.slice(0, ix + 1).join("/"),
          };
        }
      })
      .slice(1);
  }, [breadcrumbsList]);

  return (
    <Breadcrumbs className={"w-auto pb-6"}>
      {renderBreadcrumbsList.map(
        (route: RouteBreadcrumbs, ix: number, arr: RouteBreadcrumbs[]) => {
          if (arr.length - 1 == ix) {
            return <p key={ix}>{route.label}</p>;
          } else {
            return (
              <Link key={ix} color="inherit" to={route.link}>
                {route.label}
              </Link>
            );
          }
        }
      )}
    </Breadcrumbs>
  );
};

export default CustomBreadcrumbs;
