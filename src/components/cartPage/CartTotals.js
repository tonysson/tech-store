import React from 'react';
import { ProductConsumer } from '../../context/context';

export default function CartTotals() {
    return (
        <div className="container">
            <div className="row">

                <ProductConsumer>
                    {value => {
                        const { cartTax, cartSubTotal, cartTotal, clearCart } = value

                        return (
                            <div className="col text-title text-center mb-4 ">
                               <button className="btn btn-outline-danger text-capitalize mb-4" onClick={clearCart}>
                                  clear Cart
                               </button>
                               <h3>
                                  subTotal : { cartSubTotal} €
                               </h3>
                                <h3>
                                    tax : {cartTax} €
                               </h3>
                                <h3>
                                    Total : {cartTotal} €
                               </h3>
                            </div>
                        )
                    }}
                </ProductConsumer>

            </div>
        </div>
    )
}
