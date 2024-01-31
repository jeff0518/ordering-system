import { createContext, useState, ReactNode } from "react";

interface UserProgressProviderProps {
  children: ReactNode;
}

const UserProgressContext = createContext({
  progress: "",
  showCart: () => {},
  hideCart: () => {},
  showSendOut: () => {},
  hideSendOut: () => {},
  showMember: () => {},
  hideMember: () => {},
});

export function UserProgressContextProvider({
  children,
}: UserProgressProviderProps) {
  const [userProgress, setUserProgress] = useState("");

  function showCart() {
    setUserProgress("cart");
  }

  function hideCart() {
    setUserProgress("");
  }

  function showSendOut() {
    setUserProgress("sendOut");
  }

  function hideSendOut() {
    setUserProgress("");
  }

  function showMember() {
    setUserProgress("member");
  }

  function hideMember() {
    setUserProgress("");
  }

  const userProgressCtx = {
    progress: userProgress,
    showCart,
    hideCart,
    showSendOut,
    hideSendOut,
    showMember,
    hideMember,
  };
  return (
    <UserProgressContext.Provider value={userProgressCtx}>
      {children}
    </UserProgressContext.Provider>
  );
}

export default UserProgressContext;
