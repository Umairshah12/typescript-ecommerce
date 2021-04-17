type CartItemType = {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  amount: number
}

type newItemClicked = (clickedItem: CartItemType) => void;
