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
                            <h2 style={{textAlign: 'center', marginBottom: '1.5rem'}}>Newsletter Signup</h2>
                            <p style={{textAlign: 'center', marginBottom: '2rem', color: '#444'}}>Stay up to date with the latest news, updates, and resources about GLP-1 drugs and legal rights. Enter your info below to join our newsletter.</p>
                            <Form />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    );
}