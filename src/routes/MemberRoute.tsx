import { Route, Routes } from "react-router-dom";

import MemberPage from "../pages/memberPage";
import InfoPage from "../pages/memberPage/InfoPage";

function MemberRoute() {
  return (
    <Routes>
      <Route path="/" element={<MemberPage />} />
      <Route path="/info" element={<InfoPage />} />
    </Routes>
  );
}

export default MemberRoute;
