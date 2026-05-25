import HeadSeo from '@/comp/HeadSeo';

export default function ApiDocs() {
  return (
    <>
      <HeadSeo />
      <div className="container mt-5 pt-4 mb-5 pb-5">
        <h1 className="fw-bold mb-4" style={{ color: '#0a194f' }}>API Documentation</h1>
        <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
          Integrating our data into your fintech app? Our RESTful API offers sub-100ms response times and bulk lookup capabilities for IFSC and MICR verification.
        </p>
        <div className="bg-light border rounded p-4 mt-4">
          <code className="text-dark">GET /api/v1/bank/{'{ifsc_code}'}</code>
          <p className="text-muted small mt-2 mb-0">Returns full branch details in JSON format.</p>
        </div>
      </div>
    </>
  );
}
