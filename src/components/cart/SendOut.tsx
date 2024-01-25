import { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import Modal from "../UI/Modal";
import ButtonUI from "../UI/ButtonUI";
import CartContext from "../../context/CartContext";
import UserProgressContext from "../../context/UserProgressContext.";
import Loading from "../error/Loading";
import { CartDataProps } from "../../utils/type";
import { patchCart } from "../../services/tableAPI";
import { Toast } from "../../utils/getSweetalert";

function SendOut() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const [dataBase, setDataBase] = useState<CartDataProps | undefined>(
    undefined
  );
  const [newCartData, setNewCartData] = useState<CartDataProps | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const cartTotal = cartCtx!.items.reduce(
    (totalPrice, item) =>
      totalPrice + (item.quantity ? +item.quantity : 0) * +item.selling,
    0
  );

  const uploadData = async (tableData: CartDataProps) => {
    try {
      if (tableData !== undefined) {
        setIsLoading(true);
        await patchCart(tableData);
        setIsLoading(false);
        cartCtx?.clearCart();
        Toast.fire({
          icon: "success",
          title: `${t("messages.sent")}`,
        });
      } else {
        Toast.fire({
          icon: "error",
          title: `${t("messages.noCartData")}`,
        });
      }

      saveLocalStorage(tableData);
    } catch (error) {
      console.log(error);
      throw new Error(`${t("messages.UploadData")}`);
    }
  };

  const mergeLSDataWithCartHandler = () => {
    const storedCartData = localStorage.getItem("cart");
    if (storedCartData) {
      const getLSDataArray = JSON.parse(storedCartData);
      const { tableId, shoppingCar, totalAmount } = getLSDataArray;
      const newAmount = cartTotal + +totalAmount;

      const newItems = shoppingCar;
      newCartData?.shoppingCar.map((item) => {
        let isFind = false;
        for (let i = 0; i < shoppingCar.length; i++) {
          if (item.productId === shoppingCar[i].productId) {
            newItems[i].quantity += item.quantity;
            isFind = true;
          }
        }

        if (!isFind) {
          newItems.push(item);
        }
      });

      const updatedData = {
        tableId: tableId,
        shoppingCar: newItems,
        totalAmount: newAmount,
      };
      setDataBase(updatedData);
    } else {
      setDataBase(newCartData);
    }
  };

  const saveLocalStorage = (tableData: CartDataProps) => {
    const cartDataString = JSON.stringify(tableData);
    localStorage.setItem(`cart`, cartDataString);
  };

  function submitHandler() {
    mergeLSDataWithCartHandler();
    userProgressCtx.hideSendOut();
  }

  function goToCartHandler() {
    userProgressCtx.showCart();
  }
  function closeSendOutHandler() {
    userProgressCtx.hideSendOut();
  }

  useEffect(() => {
    const storedTableId = localStorage.getItem("tableId");
    if (storedTableId && cartTotal) {
      const tableData = {
        tableId: storedTableId,
        shoppingCar: cartCtx!.items.map((item) => ({
          productId: item.productId,
          name: item.name,
          quantity: item.quantity,
          selling: item.selling,
        })),
        totalAmount: cartTotal,
      };

      setNewCartData(tableData as CartDataProps);
    }
  }, [cartCtx, cartTotal]);

  useEffect(() => {
    dataBase && uploadData(dataBase);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataBase]);
  return (
    <>
      {isLoading && <Loading />}

      <Modal
        className="sendOut"
        open={userProgressCtx.progress === "sendOut"}
        onClose={
          userProgressCtx.progress === "sendOut"
            ? closeSendOutHandler
            : () => {}
        }
      >
        <h2>{t("text.sure")}</h2>
        <ul>
          {cartCtx?.items.map((item) => (
            <li key={item.productId}>
              {t(`meals.name.${item.name}`)}- {item.quantity}
            </li>
          ))}
        </ul>
        <p className="cart_total">
          {t("text.total", { cartTotal: `${cartTotal}` })}
        </p>
        <div className="modal_actions">
          <ButtonUI btnStyle="btn__text" onClick={goToCartHandler}>
            {t("button.consider")}
          </ButtonUI>
          <ButtonUI btnStyle="btn__cart" onClick={submitHandler}>
            {t("button.confirm")}
          </ButtonUI>
        </div>
      </Modal>
    </>
  );
}

export default SendOut;
