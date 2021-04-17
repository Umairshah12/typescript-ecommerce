import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import Cart from "./Component/Pages/Cart";
import { useQuery } from 'react-query';
import Items from "./Component/Pages/Items";
import styled from "styled-components";
import { Drawer } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { Badge } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ActionBackup from 'material-ui/svg-icons/action/backup';

// interface

const getItems =async ():Promise<CartItemType[]> => {
 return await (await fetch('https://fakestoreapi.com/products')).json();
}

function App() {
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const [cartOpen, setCartOpen] = useState(false);
  const { isLoading, error, data } = useQuery<CartItemType[]>("products", getItems);
  if (isLoading)return <Circle><CircularProgress /></Circle>
  if (error) return <h6>Something went wrong</h6>

  const handleAddtoCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
       // 1. Is the item already added in the cart?
      const isItemInCart = prev.find(item => item.id === clickedItem.id);
      if (isItemInCart) {
        return prev.map(item =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            :item
        )
      } else {
        // First time the item is added
        return [...prev, { ...clickedItem, amount: 1 }]
      }
    })
  }

  const getTotalItems = (items: CartItemType[]) => {
    return items.reduce((ack: number, item) => ack + item.amount, 0);
  }
    
  const handleRemoveCart = (id: number) => {
    setCartItems(prev => {
    return prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    });    
  };

  return (
    <>
      <Wrapper>
        <Drawer anchor='right' open={cartOpen} onClose={()=>{setCartOpen(false)}}>
          <Cart cartItems={cartItems} addtoCart={handleAddtoCart} removeFromCart={handleRemoveCart} />
        </Drawer>
        <StyledButton onClick={() => { setCartOpen(true) }}>
          <Badge badgeContent={getTotalItems(cartItems)} color="error">
            <AddShoppingCartIcon />
          </Badge>
        </StyledButton>
      <h2>Product List</h2>
        <Grid container spacing={3}>
          {data?.map(item => {
            return (
              <>
                <Grid item key={item.id} xs={12} sm={4}>
                  <Items item={item} handleAddtoCart={handleAddtoCart}/>
                </Grid>
              </>
            )
          })}
        </Grid>
      </Wrapper>
    </>
  );
}

export default App;

const Wrapper = styled.div`
margin:40px;

h2{
  text-align:center;
  font-size:30px;
  text-transform:uppercase
}
`;

const Circle = styled.div`
display:flex;
justify-content:center;
align-items:center;
margin:100px auto;
`;

const StyledButton = styled(IconButton)`
position:fixed !important;
z-index:100;
top:80px;
right:20px
`;
