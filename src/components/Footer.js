import React from 'react';
import  styled  from 'styled-components';
import { ProductConsumer } from '../context/context';



export default function Footer() {
    return (
        <ProductConsumer>

            {value => {
                return (
                    <FooterWrapper>
                      <div className="container py-3">
                        <div className="row ">
                           <div className="col-md-12 ">
                                    <p className="text-capitalize text-center">
                                 copyright &copy; tech-store { new Date().getFullYear()}. Lawson teyi .Touts droits reservés
                             </p>
                           </div>
                         </div>
                         <div className="row">
                                <div className="col-md-12 d-flex justify-content-center">
                                    {value.socialIcons.map(item => (
                                        <a href={item.url} key={item.id}>
                                            {item.icon}
                                        </a>
                                    )
                                    )}
                                </div>
                         </div>
                           
                      </div>
                    </FooterWrapper>
                )
            }}
            
        </ProductConsumer>
    )
}

const FooterWrapper = styled.footer`

  background: var(--primaryColor);
  color:var(--mainWhite);

  .icon{
      font-size:1.5rem;
      color:var(--mainWhite);
      transition:var(--mainTransition);
      margin:1.5rem;
  }

  .icon:hover{
      color: var(--darkGrey);
      cursor:pointer;
  }
`;
