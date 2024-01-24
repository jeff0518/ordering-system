export interface MenuProps {
  productId: string;
  name: string;
  place: string;
  selling: string;
  imageUrl: string;
  isActive: boolean;
}

export interface CartDataProps {
  tableId: string;
  shoppingCar: [
    {
      productId: string;
      name: string;
      quantity: number;
      selling: string;
    }
  ];
  totalAmount: number;
}
