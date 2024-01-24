import NavigationBar from "./NavigationBar";
import Logo from "./Logo";
import style from "./Header.module.scss";

function Header() {
  return (
    <header className={style.header_container}>
      <Logo />
      <nav>
        <NavigationBar />
      </nav>
    </header>
  );
}
export default Header;
