import { useContext } from "react";

import Modal from "../UI/Modal";
import ButtonUI from "../UI/ButtonUI";
import CartContext from "../../context/CartContext";
import UserProgressContext from "../../context/UserProgressContext.";
// import { CartDataProps } from "../../utils/type";
// import { patchCart } from "../../services/tableAPI";
import { Toast } from "../../utils/getSweetalert";

function SendOut() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  // const [newCartData, setNewCartData] = useState<CartDataProps>(defaultData);

  const cartTotal = cartCtx?.items.reduce(
    (totalPrice, item) =>
      totalPrice + (item.quantity ? +item.quantity : 0) * +item.selling,
    0
  );

  const tableId = localStorage.getItem("tableId");

  const tableData = {
    tableId: tableId,
    shoppingCar: cartCtx?.items,
    totalAmount: cartTotal,
  };

  console.log(tableData);

  // const uploadData = async () => {
  //   try {
  //     await patchCart();
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error("資料上傳失敗");
  //   }
  // };

  function submitHandler() {
    Toast.fire({
      icon: "success",
      title: "已送出!",
    });
    userProgressCtx.hideSendOut();
  }

  function goToCartHandler() {
    userProgressCtx.showCart();
  }
  function closeSendOutHandler() {
    userProgressCtx.hideSendOut();
  }

  return (
    <Modal
      className="sendOut"
      open={userProgressCtx.progress === "sendOut"}
      onClose={
        userProgressCtx.progress === "sendOut" ? closeSendOutHandler : () => {}
      }
    >
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
        <ButtonUI btnStyle="btn__text" onClick={goToCartHandler}>
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
