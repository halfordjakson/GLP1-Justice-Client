import React from "react";
import Form from "./formViewer.tsx";
import Navigation from "./navigation.tsx";
import Footer from "./footer.tsx";
export default function File() {
    return (
        <React.Fragment>
            <Navigation />

            <div className="cla-rc">
                <div className="cla-rc-dec">
                    <div className="cla-cc">
                        <div className="cla-cc-dec">
                            <div className="cla-con">
                                <div className="cla-con-dec">
                                    <Form />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </React.Fragment>
    )
}