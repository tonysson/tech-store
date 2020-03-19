import React from 'react';
import Title from './../Title';


export default function Contact() {
    return (
        <section className="py-5">
            <div className="row">
                <div className="col-10 mx-auto col-md-6 my-3">
                    <Title title="Contact us"/>
                   <form className="mt-5" action="https://formspree.io/tonysson7@gmail.com" method="POST">
                       <div className="form-group">
                           <input type="text" className="form-control" name="firstName" placeholder="Lawson Teyi"/>
                       </div>
                        <div className="form-group">
                            <input type="email" className="form-control" name="email" placeholder="teyi@gmail.com" />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" name="subject" placeholder="sujet" />
                        </div>
                        <div className="form">
                            <textarea type="text" className="form-control text-center" name="message" placeholder="your message" rows="10" >

                            </textarea>
                        </div>
                        <div className="form-group mt-3">
                            <input type="submit" value="Envoyer" className="form-control bg-primary text-white"/>
                        </div>

                   </form>
                </div>
            </div>
        </section>
    )
}
