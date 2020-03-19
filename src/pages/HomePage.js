import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Services from './../components/homePage/Services';
import Featured from './../components/homePage/Featured';




export default function HomePage() {
    return (
        <>
            <Hero title="awesome gadgets" max="true">
                <Link to="/products" className="main-link" style = {{ margin:"2rem"}}>
                    our product
                </Link>
            </Hero>
            <Services/>
            <Featured/>

        </>
    )
}
