import {
  RiTranslate,
  RiAccountCircleFill,
  RiShoppingCart2Line,
} from "react-icons/ri";

import ButtonUI from "../UI/ButtonUI";
import style from "./NavigationBar.module.scss";

function NavigationBar() {
  return (
    <nav className={style.navigationBar_container}>
      <div className={style.other}>
        <ButtonUI btnStyle="btn__link">
          <RiTranslate size={30} />
        </ButtonUI>
        <ButtonUI btnStyle="btn__link">
          <RiAccountCircleFill size={30} />
        </ButtonUI>
      </div>
      <div className={style.shoppingCar}>
        <ButtonUI btnStyle="btn__link">
          <RiShoppingCart2Line size={30} />
        </ButtonUI>
      </div>
    </nav>
  );
}
export default NavigationBar;
