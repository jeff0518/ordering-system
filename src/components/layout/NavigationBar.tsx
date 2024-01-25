import { useContext } from "react";

import { MdAddShoppingCart } from "react-icons/md";
import { RiAccountCircleFill, RiShoppingCart2Line } from "react-icons/ri";
import ToggleLanguage from "./ToggleLanguage";
import ButtonUI from "../UI/ButtonUI";
import CartContext from "../../context/CartContext";
import UserProgressContext from "../../context/UserProgressContext.";
import style from "./NavigationBar.module.scss";

function NavigationBar() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const isCart = cartCtx?.items.length ? true : false;

  function showCartHandler() {
    userProgressCtx.showCart();
  }
  return (
    <nav className={style.navigationBar_container}>
      <div className={style.other}>
        <ToggleLanguage />
        <ButtonUI btnStyle="btn__icon">
          <RiAccountCircleFill size={30} />
        </ButtonUI>
      </div>
      <div className={style.shoppingCar}>
        <ButtonUI btnStyle="btn__icon" onClick={showCartHandler}>
          {isCart ? (
            <MdAddShoppingCart size={30} />
          ) : (
            <RiShoppingCart2Line size={30} />
          )}
        </ButtonUI>
      </div>
    </nav>
  );
}
export default NavigationBar;
