import Logo from "../components/layout/Logo";
import SearchForm from "../components/form/SearchForm";
import style from "./Home.module.scss";

function Home() {
  return (
    <div className={style.home_container}>
      <Logo />
      <div className={style.form}>
        <SearchForm />
      </div>
    </div>
  );
}
export default Home;
