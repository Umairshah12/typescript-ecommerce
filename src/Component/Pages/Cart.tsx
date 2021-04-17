
import React from "react";
import CartItems from "./CartItems";
import styled from "styled-components";


interface CartProps {
  cartItems: Array<CartItemType>,
  addtoCart: newItemClicked,
  removeFromCart: (id: number) => void
}

  const Cart: React.FC<CartProps> = ({ cartItems, addtoCart, removeFromCart }) => {

  const calculateTotal = (items:CartItemType[]) => {
   return items.reduce((ack: number, item) => ack + item.price * item.amount, 0);
  }

  return (
    <>
      <Wrapper>
        <h2>Your Shopping Cart </h2>
        {cartItems.length === 0 ? <p>NO items in Cart</p>:""}
        {cartItems?.map(item => {
          return <CartItems item={item} addtoCart={addtoCart} removeFromCart={removeFromCart} />
        })}
        <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
      </Wrapper>
    </>
  )
}

export default Cart;

const Wrapper = styled.div`
width:400px;
padding:20px
`;