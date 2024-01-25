import Logo from "../components/layout/Logo";
import SearchForm from "../components/form/SearchForm";
import ToggleLanguage from "../components/layout/ToggleLanguage";
import style from "./HomePage.module.scss";

function HomePage() {
  return (
    <div className={style.home_container}>
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
