import React from 'react';
import "../styles/footer.css";
const Footer = () => {
  const helpfulLinks = [
    { href: '/patients/report-a-side-effect.html', label: 'Report a side effect' },
    { href: '/patients.html', label: 'Patient help' },
    { href: '/contact-us/corporate-procurement.html', label: 'Supplier help' },
    { href: '/our-products/our-medicines.html', label: 'Product list' },
    { href: '/contact-us.html', label: 'Contact us' },
    { href: '/investors/annual-report.html', label: 'Annual Report' },
    { href: '/sustainable-business/esg-portal.html', label: 'ESG reporting' },
    { href: 'https://novonordiskfonden.dk/en/', label: 'Novo Nordisk Foundation', external: true }
  ];

  const socialLinks = [
    { href: '/data-privacy-and-user-rights/social-media-privacy-disclaimer.html', label: 'Social media community guidelines' },
    { href: 'https://www.linkedin.com/company/novo-nordisk', label: 'LinkedIn', external: true },
    { href: 'https://www.youtube.com/user/novonordisk', label: 'YouTube', external: true },
    { href: 'https://www.facebook.com/novonordisk', label: 'Facebook', external: true },
    { href: 'https://twitter.com/novonordisk', label: 'X (Twitter)', external: true },
    { href: 'https://www.instagram.com/novonordisk', label: 'Instagram', external: true },
    { href: 'https://www.tiktok.com/@novonordisk', label: 'TikTok', external: true }
  ];

  const legalLinks = [
    { href: '/copyright.html', label: '© 2025 Novo Nordisk A/S' },
    { href: '/data-privacy-and-user-rights.html', label: 'Data Privacy' },
    { href: '/data-privacy-and-user-rights/cookie-policy.html', label: 'Cookie policy' },
    { href: '#', label: 'Cookie settings', extraClass: 'optanon-toggle-display', tabIndex: 0 }
  ];

  return (
    <footer id="footer" role="contentinfo" className="ft-wrapper gutters snipcss-pwAhK">
      <div className="tb-Grid tb-Grid--l--24 tb-Grid--m--24 tb-Grid--s--24 position-relative">
        <div className="tb-GridColumn tb-GridColumn--l--5 tb-GridColumn--offset--l--0 tb-GridColumn--m--5 tb-GridColumn--offset--m--1 tb-GridColumn--s--10 tb-GridColumn--offset--s--2 m-xl-bottom">
          <h2 className="tagline m-xxs-bottom">NOVO NORDISK HQ</h2>
          <div className="infotext">
            <p>
              Novo Nordisk A/S<br />
              Novo Alle 1<br />
              2880 Bagsværd<br />
              Denmark<br />
              +45-4444-8888<br />
              CVR-no.&nbsp;24256790
            </p>
            <p>&nbsp;</p>
            <p>
              <i>
                Our medicines are for the approved indication for which they are authorised in the local country or region. For more information, please visit our{' '}
                <strong>
                  <a href="/our-products/our-medicines.html">product page</a>
                </strong>
              </i>
            </p>
          </div>
        </div>

        <div className="tb-GridColumn tb-GridColumn--l--5 tb-GridColumn--offset--l--1 tb-GridColumn--m--5 tb-GridColumn--offset--m--1 tb-GridColumn--s--8 tb-GridColumn--offset--s--2 m-xl-bottom">
          <h2 className="tagline m-xxs-bottom">Helpful links</h2>
          <ul className="list">
            {helpfulLinks.map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.href}
                  target={link.external ? '_blank' : '_self'}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  aria-label={link.label + (link.external ? ', opens in a new window' : '')}
                  className="infotext"
                >
                  {link.label}
                  <span className="icon icon-right-arrow m-xxs-left" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="tb-GridColumn tb-GridColumn--l--5 tb-GridColumn--offset--l--1 tb-GridColumn--m--5 tb-GridColumn--offset--m--1 tb-GridColumn--s--10 tb-GridColumn--offset--s--2 m-xl-bottom social-media-links">
          <h2 className="tagline m-xxs-bottom">Follow us</h2>
          <ul className="list">
            {socialLinks.map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.href}
                  target={link.external ? '_blank' : '_self'}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  aria-label={link.label + (link.external ? ', opens in a new window' : '')}
                  className="infotext"
                >
                  {link.label}
                  <span className="icon icon-right-arrow m-xxs-left" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="tb-GridColumn tb-GridColumn--l--6 tb-GridColumn--offset--l--1 tb-GridColumn--m--5 tb-GridColumn--offset--m--1 tb-GridColumn--s--10 tb-GridColumn--offset--s--2 local-office">
          <h2 className="tagline m-xxs-bottom">Find your local office</h2>
          <a href="/location.html" target="_self" className="infotext">
            <span className="icon icon-location-blue-edge m-xxs-right">
              <span className="path1" />
              <span className="path2" />
              <span className="path3" />
              <span className="path4" />
            </span>
            Select location
          </a>
        </div>

        <div className="tb-GridColumn tb-GridColumn--l--24 tb-GridColumn--offset--l--0 tb-GridColumn--m--22 tb-GridColumn--s--20 tb-GridColumn--offset--m--1 tb-GridColumn--offset--s--2 legal-links m-xl-top">
          {legalLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              target="_self"
              className={`infotext ${link.extraClass || ''}`.trim()}
              tabIndex={link.tabIndex}
            >
              {link.label}
              <div className="righ-arrow-icon-block">
                <span className="icon icon-right-arrow m-xxs-left" />
              </div>
            </a>
          ))}
        </div>

        <div className="water-mark-container">
          <p className="watermark-text style-fLE1D" id="style-fLE1D">change</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
