import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import Form from "../UI/Form";
import InputUI from "../UI/InputUI";
import ButtonUI from "../UI/ButtonUI";

import style from "./SearchForm.module.scss";

function SearchForm() {
  const navigate = useNavigate();
  function onSubmitHandler(event: FormEvent) {
    event.preventDefault();

    navigate("/main");
  }

  return (
    <Form className="search" onSubmit={onSubmitHandler}>
      <div className={style.searchForm_input}>
        <InputUI
          label="桌號"
          id="table"
          type="text"
          placeholder="請輸入桌號"
          inputStyle="input_search"
        />
      </div>
      <div className={style.searchForm_bnt}>
        <ButtonUI btnStyle="btn__pill">送出</ButtonUI>
      </div>
    </Form>
  );
}
export default SearchForm;
