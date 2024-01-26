import { BrowserRouter } from "react-router-dom";

import Root from "./routes/root";
import { UserProgressContextProvider } from "./context/UserProgressContext.";
import { CartContextProvider } from "./context/CartContext";
import "../src/styles/globals.scss";

function App() {
  return (
    <BrowserRouter>
      <UserProgressContextProvider>
        <CartContextProvider>
          <Root />
        </CartContextProvider>
      </UserProgressContextProvider>
    </BrowserRouter>
  );
}

export default App;
