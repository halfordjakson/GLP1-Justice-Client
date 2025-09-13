import React from 'react';
import Navigation from './components/navigation';
import Footer from './components/footer';
import { useNavigate } from 'react-router-dom';
import './App.css';
import './styles/about.css';

const articles = [
    {
        title: 'What are GLP-1 Injuries?',
        content: 'GLP-1 receptor agonists are a class of drugs used to treat type 2 diabetes and obesity. However, some patients have experienced serious side effects, including gastroparesis, severe nausea, and more.'
    },
    {
        title: 'Common Side Effects and Risks',
        content: 'Reported injuries include gastroparesis (stomach paralysis), severe gastrointestinal issues, and even hospitalizations. It is important to be aware of these risks if you are taking or have taken GLP-1 drugs.'
    },
    {
        title: 'Legal Rights and Compensation',
        content: 'If you have suffered from GLP-1 related injuries, you may be eligible for compensation. Learn about your legal rights and how to file a claim.'
    },
    {
        title: 'How to Gather Documentation',
        content: 'To support your claim, gather all relevant medical records, prescription history, and documentation of your symptoms and treatments.'
    }
];

const Home: React.FC = () => {
    const navigate = useNavigate();
    return (
        <>
            <Navigation />
            <div className="highlight-bar">GLP-1 Lawsuit Information Center</div>
            <main style={{ maxWidth: 700, margin: '0 auto', padding: '2rem 1rem' }}>
                {/* Call to Action Section */}
                <section style={{ textAlign: 'center', marginBottom: '2.5rem', padding: '2rem 1rem', background: '#f7fafc', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Check Your Eligibility for GLP-1 Injury Compensation</h1>
                    <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
                        If you’ve experienced side effects from GLP-1 drugs, you may qualify for compensation. Click below to get started.
                    </p>
                    <button
                        style={{ fontSize: '1.1rem', padding: '0.75rem 2.5rem', background: '#2b6cb0', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}
                        onClick={() => navigate('/landing')}
                    >
                        Start Now
                    </button>
                </section>

                {/* Articles Section */}
                {articles.map((article, idx) => (
                    <section key={idx} style={{ background: '#fff', borderRadius: 10, boxShadow: '0 1px 4px rgba(0,0,0,0.03)', marginBottom: '2rem', padding: '2rem 1.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{article.title}</h2>
                        <p style={{ fontSize: '1.1rem', color: '#333' }}>{article.content}</p>
                    </section>
                ))}
            </main>
            <Footer />
        </>
    );
};

export default Home;