import { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import ButtonUI from "../UI/ButtonUI";
import { MenuProps } from "../../utils/type";
import CartContext from "../../context/CartContext";
import style from "./MealItem.module.scss";

function MealItem(props: MenuProps) {
  const { productId, name, place, selling, imageUrl } = props;
  const addItemProps = { productId, name, selling, quantity: null };
  const cartCtx = useContext(CartContext);
  const [count, setCount] = useState(0);
  const { t } = useTranslation();

  function addMealToCartHandler() {
    cartCtx?.addItem(addItemProps);
    setCount((prev) => (prev += 1));
  }

  useEffect(() => {
    if (cartCtx?.items.length === 0) {
      setCount(0);
    }
  }, [cartCtx?.items]);
  return (
    <li className={style.mealItem_container}>
      <div className={style.article}>
        <img src={imageUrl} alt={name} />
        <div className={style.infoBox}>
          <h3>{t(`meals.name.${name}`)}</h3>
          <p className={style.selling}>
            {t("meals.selling", { selling: `${selling}` })}
          </p>
          <p className={style.place}>{t(`meals.place.${place}`)}</p>
        </div>
        <p className={style.actions}>
          <ButtonUI
            btnStyle="btn__pill__mealItem"
            onClick={addMealToCartHandler}
          >
            {t("button.addCart") + `(${count})`}
          </ButtonUI>
        </p>
      </div>
    </li>
  );
}
export default MealItem;
