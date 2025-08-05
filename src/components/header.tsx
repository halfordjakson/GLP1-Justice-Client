import React from 'react';
import "../styles/header.css";
const Navigation = () => {
  return (
    <div className="cope-core-navigation-top-container">
      <div className="cope-core-navigation-top-logo-container">
        
      </div>

      <nav className="cope-core-navigation-top-links-container cope-core-navigation-top-links-right" aria-label="topNavigation">
        <div className="cope-core-navigation-top-items">
          <div className="cope-core-navigation-top-sections">

            {/* Home Link */}
            <div className="cope-core-navigation-top-section cope-core-navigation-top-section-active-wrapper">
              <div className="cope-core-navigation-top-section-title">
                <a href="/" data-button-name="Top Navigation Section - Home" className="cope-core-navigation-top-section-active">
                  <div className="cope-core-navigation-top-section-title-wrapper cope-core-navigation-top-section-icon-container cope-core-navigation-top-icon-left">
                    <span className="cope-core-navigation-top-section-text">Home</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Dropdown sections */}
            {[
              {
                title: 'Why Ozempic®?',
                href: '/why-ozempic.html',
                children: [
                  { href: '/why-ozempic/what-is-ozempic.html', text: 'What Is Ozempic®?' },
                  { href: '/why-ozempic/diabetes-medicines-comparison.html', text: 'Ozempic® vs Other Type 2 Diabetes Medicines' },
                  { href: '/why-ozempic/how-ozempic-works.html', text: 'How Ozempic® Works' },
                ],
              },
              {
                title: 'How to Take Ozempic®',
                href: '/how-to-take.html',
                children: [
                  { href: '/how-to-take/ozempic-dosing.html', text: 'Ozempic® Dosing' },
                  { href: '/how-to-take/ozempic-pen.html', text: 'The Ozempic® Pen' },
                  { href: '/how-to-take/side-effects.html', text: 'Possible Side Effects' },
                ],
              },
              {
                title: 'Savings, Support, & Resources',
                href: '/savings-and-resources.html',
                children: [
                  { href: '/savings-and-resources/save-on-ozempic.html', text: 'Ozempic® Savings & Support Programs' },
                  { href: '/savings-and-resources/your-ozempic-support.html', text: 'Your Ozempic® Support' },
                  { href: '/savings-and-resources/tools-and-resources.html', text: 'Ozempic® Tools & Resources' },
                ],
              },
              {
                title: 'Lifestyle Tips & Videos',
                href: '/lifestyle-tips.html',
                children: [
                  { href: '/lifestyle-tips/diet-and-exercise-tips.html', text: 'Diet and Exercise Tips' },
                  { href: '/lifestyle-tips/staying-active.html', text: 'Staying Active' },
                  { href: '/lifestyle-tips/healthy-eating.html', text: 'Healthy Eating' },
                  { href: '/lifestyle-tips/what-is-type-2-diabetes.html', text: 'What Is Type 2 Diabetes?' },
                  { href: '/lifestyle-tips/real-ozempic-stories.html', text: 'Real Ozempic® Stories' },
                  { href: '/lifestyle-tips/story-behind-ozempic-song.html', text: 'Oh, Oh, Oh, Ozempic®: the story behind the song' },
                ],
              },
            ].map((section, index) => (
              <div key={index} className="cope-core-navigation-top-section hide-dropdown has-dropdown">
                <div className="cope-core-navigation-top-section-title">
                  <a href={section.href} data-button-name={`Top Navigation Section - ${section.title}`}>
                    <div className="cope-core-navigation-top-section-title-wrapper cope-core-navigation-top-section-icon-container cope-core-navigation-top-icon-left">
                      <span className="cope-core-navigation-top-section-text has-children" dangerouslySetInnerHTML={{ __html: section.title }} />
                    </div>
                  </a>
                  <div className="cope-core-topnavigation-dropdown-triangle-wrap">
                    <div className="cope-core-topnavigation-dropdown-triangle"></div>
                  </div>
                </div>
                <ul className="cope-core-navigation-top-section-links">
                  {section.children.map((child, i) => (
                    <li key={i} className="cope-core-navigation-top-link">
                      <a href={child.href} data-button-name={`Top Navigation Child - ${child.text}`} dangerouslySetInnerHTML={{ __html: child.text }} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* FAQ Link */}
            <div className="cope-core-navigation-top-section">
              <div className="cope-core-navigation-top-section-title">
                <a href="/faqs.html" data-button-name="Top Navigation Section - FAQs">
                  <div className="cope-core-navigation-top-section-title-wrapper cope-core-navigation-top-section-icon-container cope-core-navigation-top-icon-left">
                    <span className="cope-core-navigation-top-section-text">FAQs</span>
                  </div>
                </a>
              </div>
            </div>

          </div>

          {/* Mobile Only Links */}
          <div className="cope-core-navigation-top-mobile-only cope-core-navigation-global-mobile">
            <a href="#footer-isi-container" data-exit-modal="none">Important Safety Information</a>
            <a href="https://www.novo-pi.com/ozempic.pdf" target="_blank" rel="noopener noreferrer" data-exit-modal="none">Prescribing Information</a>
            <a href="https://www.novo-pi.com/ozempic.pdf#guide" target="_blank" rel="noopener noreferrer" data-exit-modal="none">Medication Guide</a>
            <a href="https://espanol.ozempic.com/" target="_blank" rel="noopener noreferrer" data-exit-modal="none">En Español</a>
            <a href="https://www.ozempicpro.com" target="_blank" rel="noopener noreferrer" data-exit-modal="none">Health Care Professionals Site</a>
            <div className="aem-Grid aem-Grid--12 aem-Grid--default--12">
              <div className="text aem-GridColumn aem-GridColumn--default--12">
                <div className="cope-core-text cope-core-text-1753894778403 search-link">
                  <p><a href="/search-results.html">Search</a></p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Content Placeholder */}
          <div className="cope-core-navigation-top-additional-content" />
        </div>
      </nav>

      <button
        id="cope-core-navigation-top-mobile-toggle-1753894778368"
        className="cope-core-navigation-top-mobile-only cope-core-navigation-top-mobile-toggle"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className="cope-core-navigation-top-additional-content-mobile" />
    </div>
  );
};

export default Navigation;
