import { Routes, Route } from "react-router-dom";
import { Home, Search } from "../pages";

const Endpoints = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/" element={<Search />} />
    </Routes>
  );
};

export { Endpoints as Routes };
