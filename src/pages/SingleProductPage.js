import React from 'react';
import { Link } from 'react-router-dom';
import Hero from './../components/Hero';
import singleProductImage from '../images/singleProductBcg.jpeg';
import { ProductConsumer } from '../context/context';


export default function SingleProductPage() {
    return (
        <>
            <Hero img={singleProductImage} title="single product"/>
            <ProductConsumer>
                {value => {
                    const { singleProduct, addToCart , loading} = value;

                    if(loading){
                        console.log('hello from single page')

                        return (
                            <h1>
                                product loading
                            </h1>
                        )
                    }

                    const { company, description, id, price, title, image} = singleProduct
                    return(
                        <section className="py-5">
                            <div className="container">
                                  <div className="row">
                                     <div className="col-10 mx-auto col-sm-8 col-md-6 my-3">
                                        <img src = {`../${image}`} alt = "singlepage" className="img-fluid"/>
                                     </div>

                                    <div className="col-10 mx-auto col-sm-8 col-md-6 my-3">
                                        <h5 className="text-title mb-4">
                                              {title}
                                        </h5>
                                        <h5 className="text-capitalize text-muted mb-4">
                                            company : { company }
                                        </h5>
                                        <h5 className="text-capitalize text-main mb-4">
                                            price : {price} €
                                        </h5>
                                        <p className="text-capitalize text-title mt-3">
                                           about the product :
                                        </p>
                                        <p>
                                            { description}
                                        </p>
                                        <button className="main-link" type="button" style={{ margin:'0.75rem'}} onClick = {() =>addToCart(id)}>
                                          add to cart
                                        </button>
                                        <Link to="/products" className="main-link" style={{ margin: '0.75rem' }}>
                                            back to product
                                        </Link>
                                    </div>

                                  </div>
                            </div>

                        </section>
                    )
                }}
            </ProductConsumer>
        </>
    )
}
