import { UserProgressContextProvider } from "../context/UserProgressContext.";
import { CartContextProvider } from "../context/CartContext";
import Header from "../components/layout/Header";
import Meals from "../components/meals/Meals";
import Cart from "../components/cart/Cart";
import SendOut from "../components/cart/SendOut";

function MainPage() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <SendOut />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}
export default MainPage;
