import HeadSeo from '@/comp/HeadSeo';
import Link from 'next/link';

export default function Sitemap() {
  return (
    <>
      <HeadSeo />
      <div className="container mt-5 pt-4 mb-5 pb-5">
        <h1 className="fw-bold mb-4" style={{ color: '#0a194f' }}>Sitemap</h1>
        <ul className="list-unstyled" style={{ fontSize: '1.1rem', lineHeight: '2' }}>
          <li><Link href="/" className="text-decoration-none">Home</Link></li>
          <li><Link href="/v4" className="text-decoration-none">Find IFSC (v4 Dashboard)</Link></li>
          <li><Link href="/banks-v4" className="text-decoration-none">All Banks</Link></li>
          <li className="mt-3 fw-bold text-muted">Legal & About</li>
          <li><Link href="/about-us" className="text-decoration-none">About Us</Link></li>
          <li><Link href="/privacy-policy" className="text-decoration-none">Privacy Policy</Link></li>
          <li><Link href="/terms-of-service" className="text-decoration-none">Terms of Service</Link></li>
          <li><Link href="/contact-support" className="text-decoration-none">Contact Support</Link></li>
          <li><Link href="/api-docs" className="text-decoration-none">API Docs</Link></li>
        </ul>
      </div>
    </>
  );
}