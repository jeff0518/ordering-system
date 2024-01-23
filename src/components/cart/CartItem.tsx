import ButtonUI from "../UI/ButtonUI";
import style from "./CartItem.module.scss";

interface CartItemProps {
  name: string;
  quantity: number | null;
  selling: string;
  onAdd: () => void;
  onRemove: () => void;
}
function CartItem({ name, quantity, selling, onAdd, onRemove }: CartItemProps) {
  return (
    <li className={style.cartItem_container}>
      <p>
        {name} - {quantity} * {selling}
      </p>
      <div className={style.cartItem_actions}>
        <ButtonUI btnStyle="btn__round__small" onClick={onRemove}>
          -
        </ButtonUI>
        <span>{quantity}</span>
        <ButtonUI btnStyle="btn__round__small" onClick={onAdd}>
          +
        </ButtonUI>
      </div>
    </li>
  );
}
export default CartItem;
