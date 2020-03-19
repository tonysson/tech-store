import React, { Component } from 'react';
import  styled  from 'styled-components';
import { FaDolly, FaRedo, FaDollarSign} from 'react-icons/fa';

export default class Services extends Component {

    state = {
        services: [

            {
                id:1,
                icon:<FaDolly/>,
                title:'Livraison Gratuite',
                text:'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.'
            },

            {
                id: 2,
                icon: <FaRedo />,
                title: 'Politique de Retour sur 30 jours',
                text: 'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.'
            },

            {
                id: 3,
                icon: <FaDollarSign />,
                title: 'Payement Securisé',
                text: 'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.'
            }
        ]
    }
    render() {
        return (
            <ServicesWrapper className="py-5">
                <div className="container">

                    <div className="row">

                        { this.state.services.map(item => {
                            return(
                                <div className ="col-10 mx-auto col-sm-6 col-md-4 text-center my-3" key = {item.id}>

                                    <div className="services-icon">
                                       { item.icon}
                                    </div>
                                    <div className="mt-3 text-capitalize font-weight-bold">
                                        {item.title}
                                    </div>
                                    <div className="mt-3 ">
                                        {item.text}
                                    </div>

                                </div>
                            )
                        })}

                    </div>

                </div>
                
            </ServicesWrapper>
        )
    }
}

const ServicesWrapper = styled.section`

background: rgba(206,172,203);

.services-icon {
    font-size:2.5rem;
    color: var(--primaryColor);
}

p{
    color:var(--darkGrey);
}

`;