import React from "react";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import PrivateRoute from "./components/auth/PrivateRoute";
import Profile from "./components/dashboard/Profile";
import Dashboard from "./pages/Dashboard";
import OpenRoute from "./components/auth/OpenRoute";
import CreateProduct from "./components/dashboard/createProduct/CreateProduct";
import MyProduct from "./components/dashboard/MyProduct";
import SingleProductPage from "./pages/SingleProductPage";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<SingleProductPage />} />
        <Route
          path="/sign-in"
          element={
            <OpenRoute>
              <SignIn />
            </OpenRoute>
          }
        />
        <Route
          path="/sign-up"
          element={
            <OpenRoute>
              <SignUp />
            </OpenRoute>
          }
        />
        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/create-product" element={<CreateProduct />} />
          <Route path="/dashboard/my-product" element={<MyProduct />} />
        </Route>
      </Routes>
    </MainLayout>
  );
}

export default App;
