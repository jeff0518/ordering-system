import NavigationBar from "./NavigationBar";
import Logo from "./Logo";
import Cart from "../cart/Cart";
import SendOut from "../cart/SendOut";
import MemberModal from "../member/MemberModal";
import style from "./Header.module.scss";

interface LayoutProps {
  children: React.ReactNode;
}

function Header({ children }: LayoutProps) {
  return (
    <>
      <header className={style.header_container}>
        <Logo />
        <nav>
          <NavigationBar />
        </nav>
      </header>
      <Cart />
      <SendOut />
      <MemberModal />
      <div className={style.children}>{children}</div>
    </>
  );
}
export default Header;
