import React from 'react';
import Products from './../components/productsPage/Products';
import Hero from './../components/Hero';
import productsBcg from '../images/productsBcg.jpeg'

export default function ProductPage() {
    return (
        <>
            <Hero img = {productsBcg} />
            <Products />
        </>
    )
}
