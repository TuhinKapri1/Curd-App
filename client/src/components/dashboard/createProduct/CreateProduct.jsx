import React, { useEffect } from "react";
import RenderStep from "./RenderStep";
import { useDispatch } from "react-redux";
import { setProduct, setStep, setUpadte } from "../../../redux/productSlice";

function CreateProduct() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUpadte(false));
    dispatch(setProduct(null));
    dispatch(setStep(1));
  }, []);
  return (
    <div className="p-4">
      <h1>Create Product</h1>
      <div>
        <RenderStep />
      </div>
    </div>
  );
}

export default CreateProduct;
