import HeadSeo from '@/comp/HeadSeo';
import Link from 'next/link';
import Head from 'next/head';
import { BsMap, BsBank, BsGearFill, BsSearch, BsLink45Deg } from 'react-icons/bs';
import bankname_db from '../../json/bank_name.json';

export default function V4Sitemap({ banks }) {
  return (
    <>
      <Head>
        <title>Sitemap - Bank IFSC Code Pages | QPkendra</title>
        <meta name="description" content="Complete sitemap of all bank IFSC code pages on QPkendra. Browse all banks, branches and IFSC lookup pages." />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://bankifsccode.qpkendra.com/v4/sitemap" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Sitemap - Bank IFSC Code Pages | QPkendra" />
        <meta property="og:description" content="Complete sitemap of all bank IFSC code pages on QPkendra." />
        <meta property="og:url" content="https://bankifsccode.qpkendra.com/v4/sitemap" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bankifsccode.qpkendra.com/v4" },
            { "@type": "ListItem", "position": 2, "name": "Sitemap" }
          ]
        })}} />
      </Head>

      <div className="container mt-4 mb-5 pb-5">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb" style={{ background: 'none', padding: 0 }}>
            <li className="breadcrumb-item"><Link href="/v4" className="text-decoration-none text-muted fw-semibold" style={{ fontSize: '0.9rem' }}>Home</Link></li>
            <li className="breadcrumb-item active fw-bold" aria-current="page" style={{ color: '#4a5568', fontSize: '0.9rem' }}>Sitemap</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-5">
          <h1 className="fw-bold mb-2" style={{ color: '#0a194f' }}>Sitemap</h1>
          <p className="text-muted mb-0" style={{ maxWidth: '600px', fontSize: '1.05rem' }}>
            A complete directory of all pages available on the v4 platform.
          </p>
        </div>

        {/* Major Pages */}
        <div className="bg-white border rounded p-4 mb-5" style={{ borderColor: '#e2e8f0' }}>
          <h4 className="fw-bold mb-4 d-flex align-items-center pb-3 border-bottom" style={{ color: '#0a194f' }}>
            <BsMap className="me-2 text-muted" size={20} /> Main Pages
          </h4>
          <div className="row g-3">
            <div className="col-12 col-sm-6 col-lg-4">
              <Link href="/v4" className="text-decoration-none">
                <div className="bg-light rounded p-3 d-flex align-items-center" style={{ border: '1px solid #e2e8f0', transition: 'border-color 0.2s' }}
                  onMouseOver={(e) => e.currentTarget.style.borderColor = '#0a194f'}
                  onMouseOut={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                >
                  <BsMap className="me-3 text-primary" size={18} />
                  <div>
                    <div className="fw-bold small" style={{ color: '#1e293b' }}>Home</div>
                    <div className="text-muted" style={{ fontSize: '0.7rem' }}>/v4</div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-12 col-sm-6 col-lg-4">
              <Link href="/v4/searchifsc" className="text-decoration-none">
                <div className="bg-light rounded p-3 d-flex align-items-center" style={{ border: '1px solid #e2e8f0', transition: 'border-color 0.2s' }}
                  onMouseOver={(e) => e.currentTarget.style.borderColor = '#0a194f'}
                  onMouseOut={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                >
                  <BsSearch className="me-3 text-primary" size={18} />
                  <div>
                    <div className="fw-bold small" style={{ color: '#1e293b' }}>Search IFSC</div>
                    <div className="text-muted" style={{ fontSize: '0.7rem' }}>/v4/searchifsc</div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-12 col-sm-6 col-lg-4">
              <Link href="/banks-v4" className="text-decoration-none">
                <div className="bg-light rounded p-3 d-flex align-items-center" style={{ border: '1px solid #e2e8f0', transition: 'border-color 0.2s' }}
                  onMouseOver={(e) => e.currentTarget.style.borderColor = '#0a194f'}
                  onMouseOut={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                >
                  <BsBank className="me-3 text-primary" size={18} />
                  <div>
                    <div className="fw-bold small" style={{ color: '#1e293b' }}>All Banks</div>
                    <div className="text-muted" style={{ fontSize: '0.7rem' }}>/banks-v4</div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-12 col-sm-6 col-lg-4">
              <Link href="/v4/settings" className="text-decoration-none">
                <div className="bg-light rounded p-3 d-flex align-items-center" style={{ border: '1px solid #e2e8f0', transition: 'border-color 0.2s' }}
                  onMouseOver={(e) => e.currentTarget.style.borderColor = '#0a194f'}
                  onMouseOut={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                >
                  <BsGearFill className="me-3 text-primary" size={18} />
                  <div>
                    <div className="fw-bold small" style={{ color: '#1e293b' }}>Settings</div>
                    <div className="text-muted" style={{ fontSize: '0.7rem' }}>/v4/settings</div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-12 col-sm-6 col-lg-4">
              <Link href="/v4/sitemap" className="text-decoration-none">
                <div className="bg-light rounded p-3 d-flex align-items-center" style={{ border: '1px solid #e2e8f0', transition: 'border-color 0.2s' }}
                  onMouseOver={(e) => e.currentTarget.style.borderColor = '#0a194f'}
                  onMouseOut={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                >
                  <BsLink45Deg className="me-3 text-primary" size={18} />
                  <div>
                    <div className="fw-bold small" style={{ color: '#1e293b' }}>Sitemap</div>
                    <div className="text-muted" style={{ fontSize: '0.7rem' }}>/v4/sitemap</div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Bank Links */}
        <div className="bg-white border rounded p-4" style={{ borderColor: '#e2e8f0' }}>
          <h4 className="fw-bold mb-1 d-flex align-items-center pb-3 border-bottom" style={{ color: '#0a194f' }}>
            <BsBank className="me-2 text-muted" size={20} /> Banks
            <span className="ms-2 badge bg-light text-muted border" style={{ fontSize: '0.75rem' }}>{banks.length} banks</span>
          </h4>
          <p className="text-muted small mb-4">All bank pages with branch details. Each bank also has a <strong>sitelink</strong> page listing every IFSC code.</p>

          <div className="row g-2">
            {banks.map((bank) => (
              <div className="col-12 col-sm-6 col-lg-4" key={bank.bank_id}>
                <div className="border rounded p-3" style={{ borderColor: '#e2e8f0' }}>
                  <Link href={`/v4/${bank.url}`} className="text-decoration-none">
                    <div className="fw-bold small text-truncate" style={{ color: '#1e293b' }}>{bank.name}</div>
                  </Link>
                  <div className="d-flex gap-3 mt-1">
                    <Link href={`/v4/${bank.url}`} className="text-decoration-none text-muted" style={{ fontSize: '0.7rem' }}>
                      Branches
                    </Link>
                    <Link href={`/v4/sitelink/${bank.url}`} className="text-decoration-none" style={{ fontSize: '0.7rem', color: '#0056b3' }}>
                      Sitelinks
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const banks = bankname_db.map((bank) => ({
    bank_id: bank.bank_id,
    name: bank.BANK_NAME,
    url: bank.BANK_NAME.replaceAll(' ', '-'),
  }));

  return {
    props: {
      banks,
    },
  };
}
