// import Header from "./components/layout/Header";
// import Meals from "./components/meals/Meals";
// import Cart from "./components/cart/Cart";
// import SendOut from "./components/cart/SendOut";
// import { CartContextProvider } from "./context/CartContext";
// import { UserProgressContextProvider } from "./context/UserProgressContext.";
import Home from "./pages/Home";
import "../src/styles/globals.scss";

function App() {
  return (
    <Home />
    // <UserProgressContextProvider>
    //   <CartContextProvider>
    //     <Header />
    //     <Meals />
    //     <Cart />
    //     <SendOut />
    //   </CartContextProvider>
    // </UserProgressContextProvider>
  );
}

export default App;
