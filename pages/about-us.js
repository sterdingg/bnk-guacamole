import HeadSeo from '@/comp/HeadSeo';

export default function AboutUs() {
  return (
    <>
      <HeadSeo />
      <div className="container mt-5 pt-4 mb-5 pb-5">
        <h1 className="fw-bold mb-4" style={{ color: '#0a194f' }}>About Us</h1>
        <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
          BankIFSC Code was created with a singular mission: to provide the most precise and readily available financial data for banking professionals, developers, and regular users across the country. Our databases are meticulously verified and frequently updated to ensure you never experience a transaction failure due to an incorrect IFSC or MICR code.
        </p>
        <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
          We believe in a minimalist, distraction-free interface that puts utility and speed first.
        </p>
      </div>
    </>
  );
}
