import React from "react";
import styled from "styled-components";
import Button from '@material-ui/core/Button';

interface Props {
  item: CartItemType;
  handleAddtoCart: newItemClicked;
}

 const Items:React.FC <Props>= ({item,handleAddtoCart}) => {
   return (
     <Wrapper>
       <img src={item.image} alt="product-image" />
       <hr></hr>
        <div>
         <h3>{item.title}</h3>
         <p>{item.description}</p>
         <h3>Price:${item.price}</h3>
       </div>
       <Button onClick={() => {handleAddtoCart(item) }}>Add TO Cart</Button>
    </Wrapper>
  )
}

export default Items;


const Wrapper = styled.div`
display:flex;
justify-content:space-between;
flex-direction:column;
border:1px solid lightblue;
border-radius:20px;

img{
  max-height:230px;
  object-fit:cover;
  border-radius:20px 20px 0px 0px;
}

Button {
  border-radius:0px 0px 20px 20px;
}

div {
padding:10px;
font-family:Arial, Helvetica, sans-serif;
height:100%;
}

hr {
width:100%;
color:gray;
}
`;