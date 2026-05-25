import HeadSeo from '@/comp/HeadSeo';
import { BsEnvelopeFill } from 'react-icons/bs';

export default function ContactSupport() {
  return (
    <>
      <HeadSeo />
      <div className="container mt-5 pt-4 mb-5 pb-5 text-center">
        <h1 className="fw-bold mb-4" style={{ color: '#0a194f' }}>Contact Support</h1>
        <p className="text-muted mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
          Have a question, feature request, or found a discrepancy in our data? Let us know!
        </p>
        <div className="d-inline-flex align-items-center bg-light border p-4 rounded shadow-sm">
          <BsEnvelopeFill className="text-primary me-3" size={28} />
          <a href="mailto:support@bankifsc.code" className="fs-5 fw-semibold text-decoration-none" style={{ color: '#0a194f' }}>
            support@bankifsc.code
          </a>
        </div>
      </div>
    </>
  );
}
