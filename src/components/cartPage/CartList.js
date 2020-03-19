import React from 'react';
import CartItem from './CartItem';
import { ProductConsumer } from '../../context/context';



export default function CartList() {
    return (
        <div className="container-fluid ">
            <div className="row">
                <div className="col">
                    <ProductConsumer>
                        {value => {
                            const { cart , increment, decrement, removeItem} = value

                            if(cart.length === 0) {
                                return (
                                    <h1 className="text-title text-center my-4">
                                       your cart is empty for now!!!
                                    </h1>
                                )
                            }
                            return(
                                <>
                                  { cart.map(item =>  (
                                      <CartItem 
                                       key = {item.id} 
                                       cartItem = {item}
                                       decrement={decrement}
                                       removeItem={removeItem}
                                       increment = {increment}/>
                                  ))}
                                </>
                            )
                        }}
                    </ProductConsumer>
                </div>
            </div>
        </div>
    )
}
