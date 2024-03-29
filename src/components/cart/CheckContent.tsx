import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import CheckItem from "./CheckItem";
import ButtonUI from "../UI/ButtonUI";
import getSpendingId from "../../utils/getSpendingId";
import MemberContext from "../../context/MemberContext";
import { createNewSpending } from "../../services/memberAPI";
import { getCart, getTheCheck } from "../../services/tableAPI";
import { CartDataProps } from "../../utils/type";
import { Alert } from "../../utils/getSweetalert";
import style from "./CheckContent.module.scss";

interface CartContentProps {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  closeCartHandler: () => void;
}

function CheckContent({
  closeCartHandler,
  isLoading,
  setIsLoading,
}: CartContentProps) {
  const tableId = localStorage.getItem("tableId")!;
  const [checkData, setCheckData] = useState<CartDataProps>();
  // const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const memberCtx = useContext(MemberContext);
  const { t } = useTranslation();

  const cartTotal = checkData?.shoppingCar.reduce(
    (totalPrice, item) =>
      totalPrice + (item.quantity ? +item.quantity : 0) * +item.selling,
    0
  );

  async function uploadHandler() {
    const { newDate, newTime } = getSpendingId();
    const newPoint = cartTotal!.toString();
    const newSpendingId = newDate + newTime;
    const phoneNumber = localStorage.getItem("phoneId");
    setIsLoading(true);
    try {
      await getTheCheck(tableId);
      if (phoneNumber) {
        await createNewSpending({
          phoneNumber,
          newDate,
          newPoint,
          newSpendingId,
        });

        memberCtx?.clearMember();
      }
      setCheckData(undefined);
      navigate("/");
      localStorage.clear();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ul className={style.cartItemList}>
        {isLoading ? (
          <div className={style.isLoading}>{t("messages.transfer")}</div>
        ) : (
          <>
            {checkData && checkData.shoppingCar.length > 0 ? (
              checkData?.shoppingCar.map((item) => (
                <CheckItem
                  key={item.productId}
                  name={item.name}
                  selling={item.selling}
                  quantity={item.quantity}
                />
              ))
            ) : (
              <div className={style.isLoading}>{t("messages.empty")}</div>
            )}
          </>
        )}
      </ul>
      <p className={style.cart_total}>{cartTotal && "$ " + cartTotal}</p>
      <div className={style.check_btn}>
        <ButtonUI btnStyle="btn__text" onClick={closeCartHandler}>
          {t("button.close")}
        </ButtonUI>
        {checkData && checkData.shoppingCar.length > 0 && (
          <ButtonUI btnStyle="btn__cart" onClick={checkHandler}>
            {t("button.check")}
          </ButtonUI>
        )}
      </div>
    </>
  );
}
export default CheckContent;
