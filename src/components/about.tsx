import React from 'react';
import Navigation from './navigation.tsx';
import Accordion from "./accordion.tsx";
import Footer from "./footer.tsx";
import "../styles/about.css";
export default function About() {
    return (
        <React.Fragment>
        <Navigation/>
        <div className="ab-rc">
        <div className="ab-ht">
        <div className="ab-ht-dec">
        <h1> Frequently Asked Questions</h1>
        </div>
        </div>
        <Accordion/>
        </div>
        <Footer/>
        </React.Fragment>
    );
};