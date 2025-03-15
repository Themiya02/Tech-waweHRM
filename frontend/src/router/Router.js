import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import AboutUs from "../pages/AboutUs/AboutUs";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chirth" element={<AboutUs />} />
    </Routes>
  );
};

export default AppRouter;