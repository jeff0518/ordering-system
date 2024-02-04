import { useContext } from "react";
import { useTranslation } from "react-i18next";

import CartContext from "../../context/CartContext";
import CartItem from "./CartItem";
import ButtonUI from "../UI/ButtonUI";
import style from "./CartContent.module.scss";

interface CartContentProps {
  closeCartHandler: () => void;
  showSendOutHandler: () => void;
}

function CartContent({
  closeCartHandler,
  showSendOutHandler,
}: CartContentProps) {
  const cartCtx = useContext(CartContext);
  const { t } = useTranslation();

  const cartTotal = cartCtx?.items.reduce(
    (totalPrice, item) =>
      totalPrice + (item.quantity ? +item.quantity : 0) * +item.selling,
    0
  );
  return (
    <>
      <ul className={style.cartItemList}>
        {cartCtx?.items.length === 0 && (
          <li className={style.cartItemList_error}>{t("messages.ordered")}</li>
        )}
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
      <p className={style.cart_total}>$ {cartTotal}</p>
      <div>
        <ButtonUI btnStyle="btn__text" onClick={closeCartHandler}>
          {t("button.close")}
        </ButtonUI>
        {cartCtx?.items.length !== 0 && (
          <ButtonUI btnStyle="btn__cart" onClick={showSendOutHandler}>
            {t("button.send")}
          </ButtonUI>
        )}
      </div>
    </>
  );
}
export default CartContent;
