import React from "react";
import { Route, Routes } from "react-router-dom";
import { NavbarComponent } from "./components";
import { Home, Sukses } from "./pages";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/sukses" element={<Sukses />} exact />
      </Routes>
    </>
  );
}
