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
            <div className="highlight-bar">File a Claim</div>
            <div className="fl-r">
                <div className="fl-dec"></div>
                <div className="fl-t">
                    <h2>File</h2>
                </div>
                <div className="fl-cc">
                    <div className="fl-c">
                        <div className="fl-f">
                            <Form />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    )
}