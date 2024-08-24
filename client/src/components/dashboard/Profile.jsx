import React from "react";
import { useSelector } from "react-redux";
import { getImageFromBackend } from "../../helper/helper";
import { Link } from "react-router-dom";

function Profile() {
  const { user } = useSelector((state) => state.profile);
  console.log(user);
  return (
    <div className="p-3   ">
      <p className="text-2xl font-semibold text-gray-400 ">Dashboard</p>
      <div className="mx-auto">
        <h1 className="mt-3">Your Profile</h1>
        <div className="mx-auto flex flex-col items-center ">
          <img
            src={getImageFromBackend(user?.profilePicture)}
            alt="ProfilePicture"
            className="rounded-full w-52 h-52 border p-2  "
          />

          <div className="text-[13px] mt-5 font-semibold ">
            Name : <span className="font-semibold">{user?.name}</span>
          </div>
          <div className="mt-6">
            Email : <span className="font-semibold">{user?.email}</span>
          </div>
          <div className="mt-5 flex gap-5">
            <Link
              to="/dashboard/cart"
              className="px-4 py-2 border rounded-md bg-blue-500 text-white"
            >
              GoYourCart
            </Link>
            <Link
              to="/dashboard/order"
              className="px-4 py-2 border rounded-md bg-blue-500 text-white"
            >
              YourOrder
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
