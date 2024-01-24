import LogoImage from "../../assets/orderLogo.jpg";
import style from "./Logo.module.scss";

function Logo() {
  return (
    <div className={style.logo_container}>
      <img src={LogoImage} alt="餐廳logo" />
      <h1>Simple Ordering</h1>
    </div>
  );
}
export default Logo;
