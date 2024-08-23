import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../services/productServices";
import { useDispatch } from "react-redux";
import { setProduct, setUpadte } from "../redux/productSlice";
import RenderStep from "../components/dashboard/createProduct/RenderStep";

function EditPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, isLoading } = useQuery({
    queryFn: ["fetchSingle"],
    queryFn: () => getSingleProduct(id),
  });

  console.log(data);

  if (data) {
    dispatch(setProduct(data?.product));
    dispatch(setUpadte(true))
  }

  return <div>{data && <RenderStep />}</div>;
}

export default EditPage;
