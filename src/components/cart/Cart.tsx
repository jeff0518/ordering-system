import { useContext } from "react";
import { useTranslation } from "react-i18next";

import CartContext from "../../context/CartContext";
import UserProgressContext from "../../context/UserProgressContext.";
import CartItem from "./CartItem";
import ButtonUI from "../UI/ButtonUI";
import Modal from "../UI/Modal";

function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const { t } = useTranslation();

  const cartTotal = cartCtx?.items.reduce(
    (totalPrice, item) =>
      totalPrice + (item.quantity ? +item.quantity : 0) * +item.selling,
    0
  );

  function showSendOutHandler() {
    userProgressCtx.showSendOut();
  }

  function closeCartHandler() {
    userProgressCtx.hideCart();
  }

  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === "cart"}
      onClose={
        userProgressCtx.progress === "cart" ? closeCartHandler : () => {}
      }
    >
      <h2>{t("text.cart")}</h2>
      <ul>
        {cartCtx?.items.map((item) => (
          <CartItem
            key={item.productId}
            name={item.name}
            selling={item.selling}
            quantity={item.quantity}
            onAdd={() => cartCtx.addItem(item)}
            onRemove={() => cartCtx.removeItem(item.productId)}
          />
        ))}
      </ul>
      <p className="cart_total">$ {cartTotal}</p>
      <div className="modal_actions">
        <ButtonUI btnStyle="btn__text" onClick={closeCartHandler}>
          {t("button.close")}
        </ButtonUI>
        {cartCtx?.items.length !== 0 && (
          <ButtonUI btnStyle="btn__cart" onClick={showSendOutHandler}>
            {t("button.send")}
          </ButtonUI>
        )}
      </div>
    </Modal>
  );
}
export default Cart;
