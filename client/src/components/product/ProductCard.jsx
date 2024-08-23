import React from "react";
import { Link } from "react-router-dom";
import { getImageFromBackend } from "../../helper/helper";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
function ProductCard({ data }) {
  console.log(data);
  return (
    <Link
      to={`/product/${data?._id}`}
      className="group my-10 flex w-full max-w-xs flex-col overflow-hidden border border-gray-100 bg-white shadow-md"
    >
      <a className="relative flex h-60 overflow-hidden" href="#">
        <img
          className="absolute top-0 right-0 h-full w-full object-"
          src={getImageFromBackend(data?.thumbnail)}
          alt="product image"
        />

        <div className="absolute -right-16 bottom-0 mr-2 mb-4 space-y-2 transition-all duration-300 group-hover:right-0">
          <button className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </a>
      <div className="mt-4 px-5 pb-5">
        <a href="#">
          <h5 className="text-xl text-[14px] font-semibold tracking-tight text-slate-900">
            {data?.name}
          </h5>
          <h5 className="text-xl text-[15px] font-semibold tracking-tight text-slate-900">
            {data?.description}
          </h5>
        </a>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-slate-900">
              <span>
                <CurrencyRupeeIcon />
              </span>{" "}
              {data?.productVarients[0]?.price}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
