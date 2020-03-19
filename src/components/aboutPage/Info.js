import React from 'react';
import Title from './../Title';
import aboutBcg from '../../images/aboutBcg.jpeg';


export default function Info() {
    return (
        <section className="py-5">
           <div className="container">
               <div className="row">
                   <div className="col-10 mx-auto col-md-6 my-3">
                      <img src = {aboutBcg} className="img-fluid img-thumbnail" alt="about" style = {{background:"var(--darkGrey"}}/>
                   </div>

                    <div className="col-10 mx-auto col-md-6 my-3">
                        <Title title="About us" />
                        <p className="text-lead text-muted my-3">Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500!</p>

                        <p className="text-lead text-muted my-3">Contrairement à une opinion répandue, le Lorem Ipsum n'est pas simplement du texte aléatoire. Il trouve ses racines dans une oeuvre de la littérature latine classique datant de 45 av. J.-C.</p>

                        <button className="main-link" type="button" style={{marginTop:"2rem"}}>
                            More Info
                        </button>
                    </div>

               </div>

           </div>
           
        </section>
    )
}
