import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import DefaultPage from './pages/DefaultPage';
import ProductPage from './pages/ProductPage';
import SingleProductPage from './pages/SingleProductPage';
import ContactPage from './pages/ContactPage';

import { Route , Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import SideCart from './components/SideCart';
import Footer from './components/Footer';







export default class App extends Component {
    render() {
        return (
            <>
            { /* navbar, sidebar, sidecart, footer */}
                <Navbar/>
                <Sidebar/>
                <SideCart/>
                <Switch>
                    <Route path="/" exact component={HomePage}/>
                    <Route path="/about" exact component={AboutPage} />
                    <Route path="/contact" exact component={ContactPage} />
                    <Route path="/products" exact component={ProductPage} />
                    <Route path="/products/:id" exact component={SingleProductPage} />
                    <Route path="/cart" exact component={ CartPage} />
                    <Route component={DefaultPage} />   
                </Switch>
                <Footer />
            </>
        )
    }
}

