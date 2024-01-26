import Logo from "../components/layout/Logo";
import SearchForm from "../components/form/SearchForm";
import ToggleLanguage from "../components/layout/ToggleLanguage";
import style from "./Pages.module.scss";

function HomePage() {
  return (
    <div className={`${style.pages} ${style.home}`}>
      <div className={style.header}>
        <Logo />
        <ToggleLanguage />
      </div>

      <div className={style.form}>
        <SearchForm />
      </div>
    </div>
  );
}
export default HomePage;
