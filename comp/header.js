import { BsBank, BsBoxArrowInRight, BsSearch } from 'react-icons/bs';

function header(props) {
  return (
    <header className="border-bottom bg-white">
      <div className="container d-flex flex-wrap justify-content-between align-items-center py-3">
        <a href="/v4" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none">
          <BsBank className="me-2" size={24} color="#0a194f" />
          <span className="fs-4 fw-bold" style={{ color: '#0a194f' }}>BankIFSC Code</span>
        </a>

        <ul className="nav nav-pills flex-grow-1 justify-content-center mb-3 mb-lg-0">
          <li className="nav-item">
            <a href="/v4" className="nav-link fw-semibold text-muted">Find IFSC</a>
          </li>
          <li className="nav-item">
            <a href="/v4/searchifsc" className="nav-link fw-semibold text-muted">Search IFSC</a>
          </li>

          <li className="nav-item">
            <a href="/banks-v4" className="nav-link fw-semibold" style={{ color: '#0a194f', borderBottom: '3px solid #0a194f', borderRadius: 0, paddingBottom: '0.4rem' }}>Banks</a>
          </li>
        </ul>
        
        <div className="d-flex align-items-center position-relative">
          <div className="position-relative me-3 d-none d-md-block">
            <BsSearch className="position-absolute text-muted" size={14} style={{ top: '10px', left: '12px' }} />
            <input type="text" className="header-search" placeholder="Search..." />
          </div>
        </div>
      </div>
    </header>
  );
}

export default header;