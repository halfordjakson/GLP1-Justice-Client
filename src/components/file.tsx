import React from "react";
import Form from "./formViewer.tsx";
import Navigation from "./navigation.tsx";
import Footer from "./footer.tsx";
import "../styles/file.css";
export default function File() {
    return (
        <React.Fragment>
            <Navigation />
            <div className="nws-r-r nrmal">
                <div className="nws-r-r pd-1">
                    <div className="nws-dec">
                        <div className="nws-cont-con text-white">
                            <Form/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    );
}