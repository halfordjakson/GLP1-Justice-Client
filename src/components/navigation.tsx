import { Link } from 'react-router-dom';
import '../styles/navigation.css';
import glpJustice from "../assets/glp-justice-default-08072025.png";
export default function Navigation() {
return (
    <nav className="dcr-5k6jfi snipcss-v6Fa8 style-Y8dkI" id="style-Y8dkI">
      <div className="dcr-1apgfiu">
        <a href="/" data-link-name="header : logo">
          <img src={glpJustice} width="250" height="250"/>
          <span className="dcr-1p0hins">glp Justice</span>
        </a>
      </div>
      <input
        type="checkbox"
        id="header-nav-input-checkbox"
        name="more"
        tabIndex={-1}
        aria-hidden={true}
        role="button"
        aria-expanded={false}
        aria-haspopup="true"
        className="dcr-1acea34"
      />

      <div className="dcr-18nbak">
        <ul className="dcr-1d6g26q">
          {[
            ['/file',  'File'],
            ['/about',  'About'],
            ['/profile', 'Profile'],
            ['/services', 'Services'],
            ['/resources', 'Resources'],
            ['/sandbox', 'Sandbox']
          ].map(([href, label]) => (
            <li
              className={
                label === 'File a Claim Inquiry' ? 'dcr-1x36b2n' : 'dcr-1gcso2u'
              }
              key={label}
            >
              <Link
                to={href}
                data-link-name={`header : titlepiece : nav : primary : ${label}`}
                className={
                  label === 'File a Claim Inquiry'
                    ? 'dcr-17fanw1'
                    : 'dcr-9ucpkb'
                }
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
