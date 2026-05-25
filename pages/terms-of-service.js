import HeadSeo from '@/comp/HeadSeo';

export default function TermsOfService() {
  return (
    <>
      <HeadSeo />
      <div className="container mt-5 pt-4 mb-5 pb-5">
        <h1 className="fw-bold mb-4" style={{ color: '#0a194f' }}>Terms of Service</h1>
        <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
          By using BankIFSC Code, you agree to these Terms of Service. While we strive to ensure absolute accuracy of all financial data presented, users are encouraged to verify critical banking codes directly with their respective bank branches before initiating large or sensitive transactions.
        </p>
      </div>
    </>
  );
}
