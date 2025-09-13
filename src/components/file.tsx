import React from "react";
import Form from "./formViewer.tsx";
import Navigation from "./navigation.tsx";
import Footer from "./footer.tsx";
import "../styles/file.css";
import "../styles/about.css";

export default function File() {
    return (
        <React.Fragment>
            <Navigation />
            <div className="highlight-bar">Sign Up for Our Email Newsletter</div>
            <div className="fl-r">
                <div className="fl-dec"></div>
                <div className="fl-cc">
                    <div className="fl-c">
                        <div className="fl-f">
                                                        <p style={{textAlign: 'center', marginBottom: '2rem', color: '#444'}}>
                                                            Justice starts with the truth. Get the latest on Ozempic, Wegovy, and Mounjaro—stories and updates the drug companies don’t want you to see. Sign up and join the fight for real accountability.
                                                        </p>
                            <Form />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    );
}