import React from 'react'
import { useSelector } from 'react-redux';

 const Cart = () => {
  const {total, totalItems} = useSelector((state) => state.auth);
  return (
    <div>Cart</div>
  )
}
export default Cart; 