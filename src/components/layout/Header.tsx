import NavigationBar from "./NavigationBar";
import style from "./Header.module.scss";
import LogoImage from "../../assets/orderLogo.jpg";

function Header() {
  return (
    <header className={style.header_container}>
      <div className={style.title}>
        <img src={LogoImage} alt="餐廳logo" />
        <h1>Simple Ordering</h1>
      </div>
      <nav>
        <NavigationBar />
      </nav>
    </header>
  );
}
export default Header;
