import { ReactNode } from "react";

import ButtonUI from "../UI/ButtonUI";

interface TabButtonProps {
  children: ReactNode;
  isChecked: boolean;
  onClick: () => void;
}

function TabButton({ children, isChecked, onClick }: TabButtonProps) {
  return (
    <li>
      <ButtonUI
        btnStyle={isChecked ? "btn__tab__checked" : "btn__tab"}
        onClick={onClick}
      >
        {children}
      </ButtonUI>
    </li>
  );
}
export default TabButton;
