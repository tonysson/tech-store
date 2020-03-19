import React from 'react';
import Hero from '../components/Hero';
import defaultBcg from '../images/defaultBcg.jpeg';
import { Link } from 'react-router-dom';


export default function DefaultPage() {
    return (
        <>
            <Hero img = {defaultBcg} max="true" title="404">
                  <h2 className="text-uppercase">
                      page not found
                  </h2>

                  <Link to ="/" className="main-link" style={{marginTop:"2rem"}}>
                      return home
                  </Link>
            </Hero>
            
        </>
    )
}
