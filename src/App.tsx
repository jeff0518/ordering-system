import { BrowserRouter } from "react-router-dom";

import Root from "./routes/root";
import { UserProgressContextProvider } from "./context/UserProgressContext.";
import { CartContextProvider } from "./context/CartContext";
import { MemberContextProvider } from "./context/MemberContext";
import "../src/styles/globals.scss";

function App() {
  return (
    <BrowserRouter>
      <UserProgressContextProvider>
        <MemberContextProvider>
          <CartContextProvider>
            <Root />
          </CartContextProvider>
        </MemberContextProvider>
      </UserProgressContextProvider>
    </BrowserRouter>
  );
}

export default App;
