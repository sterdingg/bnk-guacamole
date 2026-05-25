import HeadSeo from '@/comp/HeadSeo';

export default function PrivacyPolicy() {
  return (
    <>
      <HeadSeo />
      <div className="container mt-5 pt-4 mb-5 pb-5">
        <h1 className="fw-bold mb-4" style={{ color: '#0a194f' }}>Privacy Policy</h1>
        <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
          At BankIFSC Code, we take your privacy seriously. We do not track your specific financial queries or sell your personal data to third parties. Our search tools are completely anonymous and designed to respect user privacy at all times.
        </p>
      </div>
    </>
  );
}
