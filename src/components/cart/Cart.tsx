import { useContext } from "react";

import CartContext from "../../context/CartContext";
import UserProgressContext from "../../context/UserProgressContext.";
import ButtonUI from "../UI/ButtonUI";
import Modal from "../UI/Modal";

function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx?.items.reduce(
    (totalPrice, item) =>
      totalPrice + (item.quantity ? +item.quantity : 0) * +item.selling,
    0
  );

  function closeCartHandler() {
    userProgressCtx.hideCart();
  }

  return (
    <Modal className="cart" open={userProgressCtx.progress === "cart"}>
      <h2>購物車</h2>
      <ul>
        {cartCtx?.items.map((item) => (
          <li key={item.productId}>
            {item.name} - {item.quantity} 份
          </li>
        ))}
      </ul>
      <p className="cart_total">$ {cartTotal}</p>
      <div className="modal_actions">
        <ButtonUI btnStyle="btn__text" onClick={closeCartHandler}>
          關閉
        </ButtonUI>
        <ButtonUI btnStyle="btn__cart">結帳</ButtonUI>
      </div>
    </Modal>
  );
}
export default Cart;
