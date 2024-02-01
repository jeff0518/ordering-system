/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import CheckItem from "./CheckItem";
import ButtonUI from "../UI/ButtonUI";
// import { createNewSpending } from "../../services/memberAPI";
import { getCart, getTheCheck } from "../../services/tableAPI";
import { CartDataProps } from "../../utils/type";
import { Toast, Alert } from "../../utils/getSweetalert";
import style from "./CheckContent.module.scss";

interface CartContentProps {
  closeCartHandler: () => void;
}

function CheckContent({ closeCartHandler }: CartContentProps) {
  const tableId = localStorage.getItem("tableId")!;
  const [checkData, setCheckData] = useState<CartDataProps>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const cartTotal = checkData?.shoppingCar.reduce(
    (totalPrice, item) =>
      totalPrice + (item.quantity ? +item.quantity : 0) * +item.selling,
    0
  );

  async function uploadHandler() {
    try {
      await getTheCheck(tableId);
      setCheckData(undefined);
      Toast.fire({ icon: "success", title: `${t("messages.sent")}` });
      localStorage.clear();
      navigate("/");
    } catch (error) {
      Alert.fire({
        title: `${t(`messages.sever.${(error as Error).message}`)}`,
        icon: "error",
      });
    }
  }

  async function fetchTableData(Id: string) {
    try {
      setIsLoading(true);
      const response = await getCart(Id);
      setCheckData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      Alert.fire({
        title: `${t(`messages.sever.${(error as Error).message}`)}`,
        icon: "error",
      });
      setIsLoading(false);
    }
  }

  function checkHandler() {
    uploadHandler();
  }

  useEffect(() => {
    if (tableId) {
      fetchTableData(tableId);
    } else {
      Alert.fire({
        title: `${t("messages.again")}`,
        icon: "error",
      });
      navigate("/");
    }
  }, []);
  return (
    <>
      <ul className={style.cartItemList}>
        {isLoading && <div className={style.isLoading}>資料讀取中...</div>}
        {checkData?.shoppingCar.map((item) => (
          <CheckItem
            key={item.productId}
            name={item.name}
            selling={item.selling}
            quantity={item.quantity}
          />
        ))}
      </ul>
      <p className={style.cart_total}>{cartTotal && "$ " + cartTotal}</p>
      <div className={style.check_btn}>
        <ButtonUI btnStyle="btn__text" onClick={closeCartHandler}>
          {t("button.close")}
        </ButtonUI>
        {checkData && checkData.shoppingCar && (
          <ButtonUI btnStyle="btn__cart" onClick={checkHandler}>
            {t("button.check")}
          </ButtonUI>
        )}
      </div>
    </>
  );
}
export default CheckContent;
