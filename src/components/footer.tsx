// ...existing code...
import "../styles/footer.css";
const Footer = () => {
  // ...existing code...

  const legalLinks = [
    { href: '/copyright', label: '© 2025 glp Justice A/S' },
    { href: '/privacy/data', label: 'Data Privacy' },
    { href: '/privacy/cookies', label: 'Cookie policy' },
    { href: '#', label: 'Cookie settings', extraClass: 'optanon-toggle-display', tabIndex: 0 }
  ];

  return (
    <footer id="footer" role="contentinfo" className="ft-wrapper gutters snipcss-pwAhK">
      <div className="tb-Grid tb-Grid--l--24 tb-Grid--m--24 tb-Grid--s--24 position-relative">
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

      </div>
    </footer>
  );
};

export default Footer;
