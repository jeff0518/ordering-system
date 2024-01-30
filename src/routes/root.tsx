import { Route, Routes } from "react-router-dom";

import Header from "../components/layout/Header";
import HomePage from "../pages/HomePage";
import MemberRoute from "./MemberRoute";
import MainPage from "../pages/MainPage";
import ErrorPage from "../pages/ErrorPage";

function Root() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/*"
          element={
            <Header>
              <Routes>
                <Route path="/main" element={<MainPage />} />
                <Route path="/member/*" element={<MemberRoute />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </Header>
          }
        />
      </Routes>
    </>
  );
}

export default Root;
