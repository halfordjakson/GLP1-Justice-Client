import React from "react";
import Navigation from "./navigation"
import Footer from "./footer";
import "../styles/services.css"
export default function Services() {


    return (
        <React.Fragment>
            <Navigation />
            <div className="srv-r">
                <div className="srv-dec"></div>
                <div className="srv-t">
                    <h2><span className="cap-a">S</span>ervices</h2>
                </div>
                <div className="srv-cc">
                    <div className="srv-c">
                        <div className="srv-i">
                            
                        </div>
                    </div>
                </div>

            </div>
        <Footer/>
        </React.Fragment>
    )
}