import Link from 'next/link';

const logoStyle = {
  // height: 55,
  maxHeight: 60
};

const navItem = {
  padding: 0
};

const Header = () => (

  <nav className="navbar is-link is-fixed-top bcsecondary-dark p-t-10 p-b-5">
    <div className="container is-fluid">
        <div className="navbar-brand bcdark text-bold is-1 p-0">
          <Link href="/">
            <a className="navbar-item brand-text p-0">
              <img src="/static/images/uhc-logo-light.png" style={logoStyle} alt="" className="logo"/>
            </a>
          </Link>
          <div className="navbar-burger burger" data-target="navbarExampleTransparentExample">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div id="navbarExampleTransparentExample" className="navbar-menu p-0">
          <div className="navbar-end">
              <div class="navbar-item">
                <div class="field is-grouped">
                    <Link href='/'><a className="m-r-5 button is-secondary is-dark"><strong>Service Delivery</strong></a></Link>
                    <Link href='#'><a className="m-r-5 button is-secondary is-dark"><strong>Health Statistics</strong></a></Link>
                    <Link href='#'><a className="m-r-5 button is-secondary is-dark"><strong>Commodities</strong></a></Link>
                    <Link href='#'><a className="m-r-5 button is-secondary is-dark"><strong>Human Resource</strong></a></Link>
                    <Link href='#'><a className="m-r-5 button is-secondary is-dark"><strong>Community Access</strong></a></Link>
                    <Link href='/uhc'><a className="m-r-5 button is-secondary is-dark"><strong>Result Framework</strong></a></Link>
                </div>
              </div>
          </div>
        </div>
    </div>
  </nav>

);

export default Header;
