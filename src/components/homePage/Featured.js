import React from 'react'
import Product from './../Product';
import Title from './../Title';
import { ProductConsumer } from '../../context/context';
import { Link } from 'react-router-dom';




export default function Featured() {
    return (
        <section className="py-5">
            <div className="container">
                {/* title */}
                <Title center  title="featured products"/>

                {/* product */}

                <div className="row my-5">
                  <ProductConsumer>
                      {value => {
                          const { featuredProducts} = value
                          return (
                             featuredProducts.map(product => {
                                 return (
                                     <Product key = {product.id} product = {product}/>
                                 )
                             })
                          )
                      }}
                  </ProductConsumer>
                </div>
                <div className="row mt-5">
                    <div className="col text-center">
                        <Link to ="/products" className="main-link">
                            our products
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
