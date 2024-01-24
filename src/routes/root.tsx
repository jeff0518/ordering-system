import { Route, Routes } from "react-router-dom";

import HomePage from "../pages/HomePage";
import MainPage from "../pages/MainPage";
import ErrorPage from "../pages/ErrorPage";

function Root() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default Root;
