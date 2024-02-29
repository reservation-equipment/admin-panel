import { Outlet } from "react-router-dom";

const Dashboard = ({
  sideMenu,
  breadcrumbs,
}: {
  sideMenu: React.ReactNode;
  breadcrumbs: React.ReactNode;
}) => {
  return (
    <div className={"flex"}>
      {sideMenu}
      <div
        className={"w-full mt-8"}
        style={{
          marginLeft: 350,
        }}
      >
        {breadcrumbs}
        <div className={"container"}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
