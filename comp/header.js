function header(props) {
  return (
    <header>
      <nav className="navbar  navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand " href="/">
          <img className="navimg" src="/assets/favicon.png" alt="Bootstrap" width="30" height="24" />BankIFSC Code
        </a>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="align-items-end collapse navbar-collapse bavv " id="navbarSupportedContent" >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/ifsc">Bank Details With IFSC CODE</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/v1">IFSC Finder (SPA)</a>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" href="/Bankingcalender">Calender</a>
            </li> */}
            <li className="nav-item">
              <a className="nav-link" href="/sitelink">SiteLink</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/faq">FAQ's</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">About</a>
            </li>
            {/* <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li> */}

          </ul>
          {/* <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form> */}
        </div>
      </div>
    </nav>
    </header>

  );
}

export default header;