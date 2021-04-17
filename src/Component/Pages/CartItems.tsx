import React from "react";
import Button from '@material-ui/core/Button';
import styled from "styled-components";

interface CartItemsProps {
  item: CartItemType,
  addtoCart: newItemClicked,
  removeFromCart: (id: number) => void

}

const CartItems: React.FC<CartItemsProps> = ({ item, addtoCart, removeFromCart }) => {
  
  return (
    <Wrapper>
    <div>
    
      <h3>{item.title}</h3>
      <div className='information'>
        <p>Price: ${item.price}</p>
        <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
      </div>
      <div className='buttons'>
        <Button
          size='small'
          disableElevation
          variant='contained'
          onClick={() => removeFromCart(item.id)}
        >
          -
        </Button>
        <p>{item.amount}</p>
        <Button
          size='small'
          disableElevation
          variant='contained'
          onClick={() => addtoCart(item)}
        >
          +
        </Button>
      </div>
    </div>
      <img src={item.image} alt={item.title} />
    </Wrapper>
  )
}

export default CartItems;

const Wrapper = styled.div`
display: flex;
justify-content: space-between;
padding-bottom: 20px; 
border-bottom: 1px solid lightblue;

div {
  flex:1
}

.information,
.buttons {
  display:flex;
  justify-content:space-between
}

img {
  max-width:80px;
  object-fit:cover;
  margin-left:20px;
}

`;