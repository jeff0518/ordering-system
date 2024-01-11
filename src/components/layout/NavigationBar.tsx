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
      <ButtonUI btnStyle="btn__link">
        <RiTranslate size={40} />
      </ButtonUI>
      <ButtonUI btnStyle="btn__link">
        <RiAccountCircleFill size={40} />
      </ButtonUI>
      <ButtonUI btnStyle="btn__link">
        <RiShoppingCart2Line size={40} />
      </ButtonUI>
    </nav>
  );
}
export default NavigationBar;
