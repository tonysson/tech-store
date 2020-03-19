import React from 'react';
import  styled  from 'styled-components';
import { ProductConsumer } from '../../context/context';

export default function ProductFilter() {
    return (
        <ProductConsumer>
            { value => {
                const {handleChange, price, min, max, shipping,company,search, storeProducts } = value;

                //let companies = storeProducts.map(item =>  item.company);
               // console.log(companies);
               
               /**
                * methode qui nous permet de faire sortir toutes les company de  notre database
                */
               let companies = new Set();
                companies.add("all");
              for(let product in storeProducts){
                  companies.add(storeProducts[product]["company"]);
              }  
             // console.log(companies);
             companies = [...companies];

            return (
                <div className="row my-5">
                    <div className="col-10 mx-auto">
                        <FilterWrapper>
                            {/**text-search */}
                            <div>
                                <label htmlFor='search'>
                                    search product
                                </label>
                                <input
                                    name="search"
                                    type="text"
                                    id="search"
                                    onChange={handleChange}
                                    value={search}
                                    className="filter-item" />
                            </div>                          
                            {/** end of text-search */}

                            {/** category-search */}

                            <div>
                                <label htmlFor ="category">
                                    company
                                </label>
                                <select
                                 name="company"
                                 id="company"
                                 className="filter-item" 
                                 onChange={handleChange} 
                                 value={company}>
                                  { companies.map((company, index) => {
                                      return (
                                      <option key={index} value={company}>{company}</option>
                                      )
                                  })}
                                </select>
                            </div>
                            {/** end of category-search */}

                            {/** price-search */}
                            <div>
                                <label htmlFor="price">
                                    <p className="mb-2">
                                        product price : <span>
                                            { price} €
                                        </span>
                                    </p>
                                </label>
                                <input 
                                 onChange={handleChange}
                                 value={price}
                                 className="filter-price"
                                 type="range" 
                                 name="price"
                                 id="price" 
                                 min = {min} 
                                 max={max}/>
                            </div>
                            {/** end of price-search */}

                            {/* free shipping */}
                            <div>
                                <label htmlFor="shipping" className="mx-2">
                                    free shipping
                                </label>
                                <input 
                                checked={shipping && true}
                                type="checkbox"
                                name="shipping" 
                                id="shipping" 
                                onChange={handleChange}/>
                            </div>
                            {/* end of free shipping */}

                        </FilterWrapper>
                    </div>
                </div>
            )
            }}
        </ProductConsumer>
    )
}

const FilterWrapper = styled.div`
display:grid;
grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));
grid-column-gap:2rem;
grid-row-gap:1rem;
label{
    font-weight:bold;
    text-transform:capitalize;
}
input:focus, select:focus, option:focus{
    outline:none;
}
.filter-item, .fiter-price{
   display:block;
   width:100%;
   background:transparent;
   border-radius:0.5rem;
   border:2px solid var(--darkGrey);
}
`;
