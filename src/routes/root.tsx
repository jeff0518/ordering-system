import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Main from "../pages/Main";

function Root() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/main" element={<Main />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default Root;
