import React from "react";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import CreatePost from "./pages/CreatePost";
import SinglePost from "./pages/SinglePost";
import UpdatePost from "./pages/UpdatePost";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/:id" element={<SinglePost />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/update-post/:id" element={<UpdatePost />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
