import { useContext } from "react";

import Modal from "../UI/Modal";
import ButtonUI from "../UI/ButtonUI";
import CartContext from "../../context/CartContext";
import UserProgressContext from "../../context/UserProgressContext.";
import { Toast } from "../../utils/getSweetalert";

function SendOut() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx?.items.reduce(
    (totalPrice, item) =>
      totalPrice + (item.quantity ? +item.quantity : 0) * +item.selling,
    0
  );

  function submitHandler() {
    Toast.fire({
      icon: "success",
      title: "已送出!",
    });
  }

  function closeSendOutHandler() {
    userProgressCtx.hideSendOut();
  }

  return (
    <Modal className="sendOut" open={userProgressCtx.progress === "sendOut"}>
      <h2>確定要送出以下餐點？</h2>
      <ul>
        {cartCtx?.items.map((item) => (
          <li key={item.productId}>
            {item.name} - {item.quantity} 份
          </li>
        ))}
      </ul>
      <p className="cart_total">總金額：$ {cartTotal}</p>
      <div className="modal_actions">
        <ButtonUI btnStyle="btn__text" onClick={closeSendOutHandler}>
          再考慮一下
        </ButtonUI>
        <ButtonUI btnStyle="btn__cart" onClick={submitHandler}>
          送出
        </ButtonUI>
      </div>
    </Modal>
  );
}

export default SendOut;
