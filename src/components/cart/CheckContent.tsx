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
  closeCartHandler: () => void;
}

function CheckContent({ closeCartHandler }: CartContentProps) {
  const tableId = localStorage.getItem("tableId")!;
  const [checkData, setCheckData] = useState<CartDataProps>();
  const [isLoading, setIsLoading] = useState(false);
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
    try {
      setIsLoading(true);
      await getTheCheck(tableId);

      setCheckData(undefined);
      Alert.fire({ icon: "success", title: `${t("messages.checked")}` });
      localStorage.clear();

      if (phoneNumber) {
        await createNewSpending({
          phoneNumber,
          newDate,
          newPoint,
          newSpendingId,
        });
        memberCtx?.clearMember();
      }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <ul className={style.cartItemList}>
        {isLoading ? (
          <div className={style.isLoading}>資料傳輸中...</div>
        ) : (
          <>
            {checkData?.shoppingCar.map((item) => (
              <CheckItem
                key={item.productId}
                name={item.name}
                selling={item.selling}
                quantity={item.quantity}
              />
            ))}
          </>
        )}
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
