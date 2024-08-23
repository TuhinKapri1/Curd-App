import React from "react";
import { useSelector } from "react-redux";
import ProductInfoForm from "./productInfo/ProductInfoForm";
import ProductVariantForm from "./productVariant/ProductVariantForm";
import { FaCheck } from "react-icons/fa";
import ProductVariant from "./productVariant/ProductVariant";
function RenderStep() {
  const { step } = useSelector((state) => state.product);
  const steps = [
    {
      id: 1,
      title: "Product Info",
    },
    {
      id: 2,
      title: "Product Variant",
    },
  ];
  return (
    <div>
      <div className="relative mb-2 flex w-full justify-center">
        {steps.map((item, index) => (
          <>
            <div className="flex flex-col items-center " key={index}>
              <button
                className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] ${
                  step === item.id
                    ? "border-blue-500 bg-minBlue text-gray"
                    : ""
                } ${step > item.id && "bg-gray text-white"}} `}
              >
                {step > item.id ? (
                  <FaCheck className="font-bold text-gray" />
                ) : (
                  item.id
                )}
              </button>
            </div>
            {item.id !== steps.length && (
              <>
                <div
                  className={`h-[calc(34px/2)] w-[33%]  border-dashed border-b-2 ${
                    step > item.id ? "border-gray" : "border-richblack-500"
                  } `}
                ></div>
              </>
            )}
          </>
        ))}
      </div>

      <div className="relative  mb-16 flex w-[500px] mx-auto select-none justify-between">
        {steps?.map((item, index) => (
          <>
            <div
              className="flex min-w-[130px] flex-col items-center gap-y-2"
              key={index}
            >
              <p
                className={`text-sm  ${
                  step >= item.id ? "text-richblack-5" : "text-richblack-500"
                }`}
              >
                {item.title}
              </p>
            </div>
          </>
        ))}
      </div>
    
      {step === 1 && <ProductInfoForm />}
      {step === 2 && <ProductVariant />}
    </div>
  );
}

export default RenderStep;
