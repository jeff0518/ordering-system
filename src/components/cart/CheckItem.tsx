import { useTranslation } from "react-i18next";

import style from "./CheckItem.module.scss";

interface CheckItemProps {
  name: string;
  quantity: number | null;
  selling: string;
}
function CheckItem({ name, quantity, selling }: CheckItemProps) {
  const { t } = useTranslation();
  return (
    <li className={style.cartItem_container}>
      <p>
        {t(`meals.name.${name}`)} - {quantity} * {selling}
      </p>
    </li>
  );
}
export default CheckItem;
