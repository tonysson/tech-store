import React from 'react';
import { ProductConsumer } from '../../context/context';
import Title from './../Title';
import Product from './../Product';
import ProductFilter from './ProductFilter';


export default function Products() {
    return (
        <ProductConsumer>
            { value => {
                const { filteredProducts} = value;

                return (
                    <section className="py-5">
                        <div className="container">
                            <Title title = "our products" center/>
                            <ProductFilter/>
                            <div className="row">
                                <div className="col-10 mx-auto">
                                    <h6 className="text-muted text-capitalize">
                                     total Product : { filteredProducts.length}
                                    </h6>
                                </div>
                            </div>
                            <div className="row py-5">
                              { filteredProducts.length === 0 ? (
                                  <div className="col text-title text-center">
                                        <h1>Sorry, no items matched with your search!!!</h1>
                                  </div>
                              ) : ( filteredProducts.map(product => {
                                  return <Product key = {product.id} product = {product}/>
                              }))}
                            </div>
                        </div>

                    </section>
                )
            }}
        </ProductConsumer>
    )
}
  