import React from 'react';
import Navigation from './navigation.tsx';
import Accordion from "./accordion.tsx";
import Footer from "./footer.tsx";
import "../styles/about.css";
export default function About() {
    return (
        <React.Fragment>
            <Navigation />
            <div className="ab-r">
                <div className="ab-dec"></div>
                    <div className="highlight-bar">FAQ (Frequently Asked Questions)</div>
                    <div className="ab-cc">
                        <div className="ab-c">
                            <div className="ab-fv">
                            <Accordion />
                            </div>
                        </div>
                    </div>
                
            </div>
            <Footer />
        </React.Fragment>
    );
};