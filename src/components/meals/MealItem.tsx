import { useContext } from "react";

import ButtonUI from "../UI/ButtonUI";
import { MenuProps } from "../../utils/type";
import CartContext from "../../context/CartContext";
import style from "./MealItem.module.scss";

function MealItem(props: MenuProps) {
  const { productId, name, place, selling, imageUrl } = props;
  const addItemProps = { productId, name, selling, quantity: null };
  const cartCtx = useContext(CartContext);

  function addMealToCartHandler() {
    cartCtx?.addItem(addItemProps);
  }
  return (
    <li className={style.mealItem_container}>
      <div className={style.article}>
        <img src={imageUrl} alt={name} />
        <div className={style.infoBox}>
          <h3>{name}</h3>
          <p className={style.selling}>$ {selling}</p>
          <p className={style.place}>產地：{place}</p>
        </div>
        <p className={style.actions}>
          <ButtonUI
            btnStyle="btn__pill__mealItem"
            onClick={addMealToCartHandler}
          >
            加入購物車
          </ButtonUI>
        </p>
      </div>
    </li>
  );
}
export default MealItem;
