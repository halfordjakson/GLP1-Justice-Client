import React from "react";
// import Form from "./formViewer.tsx";
import underConstructionImg from "../assets/supig20f.png";
import Navigation from "./navigation.tsx";
import Footer from "./footer.tsx";
import "../styles/file.css";
import "../styles/about.css";

export default function File() {
    return (
        <React.Fragment>
            <Navigation />
            {/* Newsletter content temporarily removed. */}
            <div style={{
                minHeight: '80vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#fff',
                width: '100%'
            }}>
                <img src={underConstructionImg} alt="Under Construction" style={{
                    maxWidth: '400px',
                    width: '80vw',
                    marginBottom: '2rem',
                    filter: 'grayscale(0.2) drop-shadow(0 0 8px #aaa)'
                }} />
                <h1 style={{ fontSize: '2.5rem', color: '#333', marginBottom: '1rem', textAlign: 'center' }}>Newsletter Page Under Construction</h1>
                <p style={{ fontSize: '1.2rem', color: '#666', textAlign: 'center' }}>We're working hard to bring you updates soon. Please check back later!</p>
            </div>
            <Footer />
        </React.Fragment>
    );
}