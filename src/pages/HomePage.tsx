import Logo from "../components/layout/Logo";
import SearchForm from "../components/form/SearchForm";
import style from "./HomePage.module.scss";

function HomePage() {
  return (
    <div className={style.home_container}>
      <Logo />
      <div className={style.form}>
        <SearchForm />
      </div>
    </div>
  );
}
export default HomePage;
