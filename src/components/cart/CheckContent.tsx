import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import CheckItem from "./CheckItem";
import ButtonUI from "../UI/ButtonUI";
import { getCart } from "../../services/tableAPI";
import { CartDataProps } from "../../utils/type";
// import { Toast, Alert } from "../../utils/getSweetalert";
import style from "./CheckContent.module.scss";

interface CartContentProps {
  closeCartHandler: () => void;
}

function CheckContent({ closeCartHandler }: CartContentProps) {
  const [checkData, setCheckData] = useState<CartDataProps>();
  // const navigate = useNavigate();
  const { t } = useTranslation();

  const cartTotal = checkData?.shoppingCar.reduce(
    (totalPrice, item) =>
      totalPrice + (item.quantity ? +item.quantity : 0) * +item.selling,
    0
  );

  async function fetchTableData(tableId: string) {
    console.log(tableId);
    try {
      const response = await getCart(tableId);
      console.log("response: ", response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const tableId = localStorage.getItem("tableId")!;

    if (tableId) {
      fetchTableData(tableId);
    }
  }, []);

  // function checkHandler() {
  //   console.log("結帳");
  // }
  return (
    <>
      <ul className={style.cartItemList}>
        {checkData?.shoppingCar.map((item) => (
          <CheckItem
            key={item.productId}
            name={item.name}
            selling={item.selling}
            quantity={item.quantity}
          />
        ))}
      </ul>
      <p className={style.cart_total}>$ {cartTotal}</p>
      <div>
        <ButtonUI btnStyle="btn__text" onClick={closeCartHandler}>
          {t("button.close")}
        </ButtonUI>
        {/* {checkData.shoppingCar.length !== 0 && (
          <ButtonUI btnStyle="btn__cart" onClick={checkHandler}>
            {t("button.check")}
          </ButtonUI>
        )} */}
      </div>
    </>
  );
}
export default CheckContent;
