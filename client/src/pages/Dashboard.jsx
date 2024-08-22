
import React from "react";
import { Link, Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";

function Dashboard() {
  return (
    <div className="grid grid-cols-6">
      <div className="col-span-1">
        <Sidebar/>
      </div>
      <div className="col-span-5  "  >
        <Outlet/>
      </div>
    </div>
  );
}

export default Dashboard;

// <div>

// <Outlet />
// </div>
