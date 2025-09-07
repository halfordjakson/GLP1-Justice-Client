// components/LandingForm.tsx
import React, { useEffect } from 'react';

const LandingForm: React.FC = () => {
  useEffect(() => {
    // Dynamically load the Tally embed script
    const script = document.createElement('script');
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

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
