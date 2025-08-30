import React from "react";
import Navigation from "./navigation";
import Footer from "./footer";
import "../styles/resources.css";
export default function Resources() {

    return (
        <React.Fragment>
            <Navigation />
            <div className="rsr-r">
                <div className="rsr-dec"></div>
                <div className="rsr-t">
                    <h2>Resources</h2>
                </div>
                <div className="rsr-cc">
                    <div className="rsr-c">

                    </div>
                </div>


            </div>
            <Footer />
        </React.Fragment>
    )
}