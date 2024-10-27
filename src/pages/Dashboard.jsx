import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import Sidebar from "../components/core/Dashboard/Sidebar";
function Dashboard() {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);

  if (authLoading || profileLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div><Loader1/></div>
      </div>
    );
  }

  return (
    <div className="  relative flex min-h-[calc(100vh-3.5rem)]">
      <Sidebar />

      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto scroll-smooth">
        <div className="md:mx-auto  scroll-smooth mb-10 w-full md:w-11/12 max-w-[1000px] py-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
