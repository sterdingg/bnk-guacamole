import Link from 'next/link';

function Footer() {
  return (
    <footer className="py-4 mt-5" style={{ backgroundColor: '#f8fafd', borderTop: '1px solid #e9ecef' }}>
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-md-center">
        <div className="mb-3 mb-md-0">
          <h5 className="fw-bold mb-1" style={{ color: '#0a194f' }}>BankIFSC Code</h5>
          <p className="text-muted small mb-0">© 2024 BankIFSC Code. All rights reserved.<br/>Precise financial data for banking professionals.</p>
        </div>
        <ul className="nav justify-content-center justify-content-md-end list-unstyled d-flex flex-wrap">
          <li className="ms-4 mb-2"><Link href="/about-us" className="text-muted text-decoration-none small fw-semibold">About Us</Link></li>
          <li className="ms-4 mb-2"><Link href="/privacy-policy" className="text-muted text-decoration-none small fw-semibold">Privacy Policy</Link></li>
          <li className="ms-4 mb-2"><Link href="/terms-of-service" className="text-muted text-decoration-none small fw-semibold">Terms of Service</Link></li>
          <li className="ms-4 mb-2"><Link href="/contact-support" className="text-muted text-decoration-none small fw-semibold">Contact Support</Link></li>
          <li className="ms-4 mb-2"><Link href="/api-docs" className="text-muted text-decoration-none small fw-semibold">API Docs</Link></li>
          <li className="ms-4 mb-2"><Link href="/sitemap" className="text-muted text-decoration-none small fw-semibold">Sitemap</Link></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;