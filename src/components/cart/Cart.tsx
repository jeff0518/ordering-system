import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

import Loading from "../error/Loading";
import UserProgressContext from "../../context/UserProgressContext.";
import CartContent from "./CartContent";
import CheckContent from "./CheckContent";
import Modal from "../UI/Modal";
import TabButton from "./TabButton";
import style from "./CheckContent.module.scss";

function Cart() {
  const [selectedTitle, setSelectedTitle] = useState<string>("cart");
  const [isLoading, setIsLoading] = useState(false);
  const userProgressCtx = useContext(UserProgressContext);
  const { t } = useTranslation();

  function showSendOutHandler() {
    userProgressCtx.showSendOut();
  }

  function closeCartHandler() {
    setSelectedTitle("cart");
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
      {isLoading && (
        <h3 className={style.loading}>
          <Loading />
        </h3>
      )}

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
        <CheckContent
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          closeCartHandler={closeCartHandler}
        />
      )}
    </Modal>
  );
}
export default Cart;
