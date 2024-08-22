import { Container, Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  const sidebarLink = [
    { name: "Your Profile", path: "/dashboard/profile" },
    { name: "Create Product", path: "/dashboard/create-product" },
    { name: "Your Product", path: "/dashboard/my-product" },
  ];
  return (
    <div className="border min-h-screen ">
      <div className="flex p-4 flex-col gap-4">
        {sidebarLink?.map((ele, index) => {
          return (
            <Link
              to={ele?.path}
              key={index}
              className="text-[15px] hover:bg-gray-400 font-semibold border-gray-400  py-2 px-3  rounded-md  "
            >
              {ele.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
