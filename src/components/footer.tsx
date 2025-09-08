// ...existing code...
import "../styles/footer.css";
const Footer = () => {
  // ...existing code...

  const socialLinks = [
    { href: '/privacy/social', label: 'Social media community guidelines' },
    { href: 'https://www.linkedin.com/company/glp-justice', label: 'LinkedIn', external: true },
    { href: 'https://www.youtube.com/user/glpjustice', label: 'YouTube', external: true },
    { href: 'https://www.facebook.com/glpjustice', label: 'Facebook', external: true },
    { href: 'https://twitter.com/glpjustice', label: 'X (Twitter)', external: true },
    { href: 'https://www.instagram.com/glpjustice', label: 'Instagram', external: true },
    { href: 'https://www.tiktok.com/@glpjustice', label: 'TikTok', external: true }
  ];

  const legalLinks = [
    { href: '/copyright', label: '© 2025 glp Justice A/S' },
    { href: '/privacy/data', label: 'Data Privacy' },
    { href: '/privacy/cookies', label: 'Cookie policy' },
    { href: '#', label: 'Cookie settings', extraClass: 'optanon-toggle-display', tabIndex: 0 }
  ];

  return (
    <footer id="footer" role="contentinfo" className="ft-wrapper gutters snipcss-pwAhK">
      <div className="tb-Grid tb-Grid--l--24 tb-Grid--m--24 tb-Grid--s--24 position-relative">
        <div className="tb-GridColumn tb-GridColumn--l--5 tb-GridColumn--offset--l--0 tb-GridColumn--m--5 tb-GridColumn--offset--m--1 tb-GridColumn--s--10 tb-GridColumn--offset--s--2 m-xl-bottom">
          <div className="infotext">
            <p>
              glp Justice, LLC<br />
              1325 North Walker Ave<br />
              <br />
              Oklahoma City, Oklahoma, USA<br />
              +1-580-307-7781<br />
            </p>
            <p>&nbsp;</p>
          </div>
        </div>

        <div className="tb-GridColumn tb-GridColumn--l--5 tb-GridColumn--offset--l--1 tb-GridColumn--m--5 tb-GridColumn--offset--m--1 tb-GridColumn--s--8 tb-GridColumn--offset--s--2 m-xl-bottom">
          <h2 className="tagline m-xxs-bottom">Helpful links</h2>
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
