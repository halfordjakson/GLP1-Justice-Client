// components/LandingForm.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingForm: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Dynamically load the Tally embed script
    const script = document.createElement('script');
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    document.body.appendChild(script);

    // Listen for Tally form submission event

    const handleMessage = (event: MessageEvent) => {
      console.log('[Tally Debug] Received postMessage:', event);
      let data = event.data;
      // If data is a string, try to parse as JSON
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data);
        } catch (e) {
          // Not JSON, ignore
        }
      }
      if (data && data.event === 'Tally.FormSubmitted') {
        console.log('[Tally Debug] Tally.FormSubmitted event detected, navigating to /home');
        navigate('/home');
      }
    };
    window.addEventListener('message', handleMessage);

    return () => {
      document.body.removeChild(script);
      window.removeEventListener('message', handleMessage);
    };
  }, [navigate]);

  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0, overflow: 'hidden', position: 'relative' }}>
      {/* Tally form iframe */}
      <iframe
        data-tally-src="https://tally.so/r/3NZDlO?transparentBackground=1"
        width="100%"
        height="100%"
        frameBorder={0}
        title="Check Your Eligibility for GLP-1 Injury Compensation"
        style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, border: '0' }}
      ></iframe>
    </div>
  );
};

export default LandingForm;
