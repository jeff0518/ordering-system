import { ReactNode, createContext, useState } from "react";

interface SpendingItem {
  spendingId: string;
  date: string;
  point: number;
}

interface MemberItem {
  phoneNumber: string;
  name: string;
  count: number;
  point: number;
  spendingRecords: SpendingItem[] | [];
}

interface MemberProviderProps {
  children: ReactNode;
}

interface MemberContextType {
  item: MemberItem;
  saveItem: (item: MemberItem) => void;
  addSpendingItem: (newItem: SpendingItem) => void;
  clearMember: () => void;
}

const defaultMember = {
  phoneNumber: "",
  name: "",
  count: 0,
  point: 0,
  spendingRecords: [],
};

const MemberContext = createContext<MemberContextType | undefined>(undefined);

export function MemberContextProvider({ children }: MemberProviderProps) {
  const [memberData, setMemberData] = useState<MemberItem>(defaultMember);

  function saveItem(item: MemberItem) {
    setMemberData(item);
  }

  function addSpendingItem(newItem: SpendingItem) {
    const existingSpendingItem: SpendingItem[] = memberData.spendingRecords;

    existingSpendingItem.push(newItem);

    const updatedItems: MemberItem = {
      ...memberData,
      spendingRecords: existingSpendingItem,
    };

    setMemberData(updatedItems);
  }

  function clearMember() {
    setMemberData(defaultMember);
  }

  const memberContext = {
    item: memberData,
    saveItem,
    addSpendingItem,
    clearMember,
  };
  return (
    <MemberContext.Provider value={memberContext}>
      {children}
    </MemberContext.Provider>
  );
}

export default MemberContext;
