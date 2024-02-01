import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

import UserProgressContext from "../../context/UserProgressContext.";
import CartContent from "./CartContent";
import CheckContent from "./CheckContent";
import Modal from "../UI/Modal";
import TabButton from "./TabButton";

function Cart() {
  const [selectedTitle, setSelectedTitle] = useState<string>("cart");
  const userProgressCtx = useContext(UserProgressContext);
  const { t } = useTranslation();

  function showSendOutHandler() {
    userProgressCtx.showSendOut();
  }

  function closeCartHandler() {
    userProgressCtx.hideCart();
  }

  function selectTitleHandler(select: string) {
    setSelectedTitle(select);
  }

  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === "cart"}
      onClose={
        userProgressCtx.progress === "cart" ? closeCartHandler : () => {}
      }
    >
      <menu>
        <TabButton
          isChecked={selectedTitle === "cart" ? true : false}
          onClick={() => selectTitleHandler("cart")}
        >
          {t("text.cart")}
        </TabButton>
        <TabButton
          isChecked={selectedTitle === "checkout" ? true : false}
          onClick={() => setSelectedTitle("checkout")}
        >
          {t("text.check")}
        </TabButton>
      </menu>
      <h2>{selectedTitle === "cart" ? t("text.cart") : t("text.check")}</h2>

      {selectedTitle === "cart" ? (
        <CartContent
          closeCartHandler={closeCartHandler}
          showSendOutHandler={showSendOutHandler}
        />
      ) : (
        <CheckContent closeCartHandler={closeCartHandler} />
      )}
    </Modal>
  );
}
export default Cart;
