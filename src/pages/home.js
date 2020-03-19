import React, { Component } from 'react';

import Header from '../components/header';
import Footer from '../components/footer';
//import Blue from  '../blue.png'; 

class Home extends Component {
    render () {
        return (
            <div>

            {/* <img src={Blue} alt="blue pic"/> */}
            <Header />
            //here is the location for us to insert html files or code to render to rest of the oage
            <Footer /> 
            </div>

        )
    }
} export default Home;  