import React from "react";
import Navigation from "./navigation";
import Footer from "./footer";
import "../styles/about.css";

export default function AboutUs() {
    return (
        <React.Fragment>
            <Navigation />
            <div className="highlight-bar">About Us</div>
            <div style={{ maxWidth: 700, margin: '2rem auto', padding: '2rem 1rem', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Our Mission</h2>
                <p style={{ fontSize: '1.1rem', color: '#333', marginBottom: '1.5rem' }}>
                    We are dedicated to helping individuals harmed by drugs like Ozempic, Wegovy, and Mounjaro get the justice and support they deserve. Our team provides clear information, resources, and guidance to empower you on your legal journey.
                </p>
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Who We Are</h2>
                <p style={{ fontSize: '1.1rem', color: '#333' }}>
                    GLP Justice is a team of advocates, researchers, and legal professionals committed to transparency and accountability in the pharmaceutical industry. We believe everyone deserves access to the truth and a fair chance at justice.
                </p>
            </div>
            <Footer />
        </React.Fragment>
    );
}
