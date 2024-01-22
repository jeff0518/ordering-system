import ButtonUI from "../UI/ButtonUI";
import { MenuProps } from "../../utils/Type";
import style from "./MealItem.module.scss";

function MealItem({ name, place, selling, imageUrl }: MenuProps) {
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
          <ButtonUI btnStyle="btn__pill__mealItem">加入購物車</ButtonUI>
        </p>
      </div>
    </li>
  );
}
export default MealItem;
