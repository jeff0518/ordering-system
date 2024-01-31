import { useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { MdAddShoppingCart } from "react-icons/md";
import {
  RiAccountCircleFill,
  RiShoppingCart2Line,
  RiLoginBoxLine,
} from "react-icons/ri";
import ToggleLanguage from "./ToggleLanguage";
import ButtonUI from "../UI/ButtonUI";
import CartContext from "../../context/CartContext";
import UserProgressContext from "../../context/UserProgressContext.";
import MemberContext from "../../context/MemberContext";
import style from "./NavigationBar.module.scss";

function NavigationBar() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const memberCtx = useContext(MemberContext);
  const navigate = useNavigate();

  const isCart = cartCtx?.items.length ? true : false;
  const isMember = memberCtx?.item.phoneNumber.length === 0 ? false : true;

  const goToMemberPageHandler = useCallback(() => {
    navigate("/member");
  }, [navigate]);

  function showCartHandler() {
    userProgressCtx.showCart();
  }

  function showMemberHandler() {
    userProgressCtx.showMember();
  }

  return (
    <nav className={style.navigationBar_container}>
      <div className={style.other}>
        <ToggleLanguage />
        {isMember ? (
          <ButtonUI btnStyle="btn__icon" onClick={showMemberHandler}>
            <RiAccountCircleFill size={30} />
          </ButtonUI>
        ) : (
          <ButtonUI btnStyle="btn__icon" onClick={goToMemberPageHandler}>
            <RiLoginBoxLine size={30} />
          </ButtonUI>
        )}
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
