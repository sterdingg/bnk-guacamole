import Link from 'next/link';
import Head from 'next/head';
import { BsBank, BsChevronRight, BsGeoAlt } from 'react-icons/bs';
import fs from 'fs';
import path from 'path';
import bankname_db from '../../../json/bank_name.json';

export default function V4Sitelink({ bankName, bankUrl, branches, totalCount }) {
  const canonicalUrl = `https://bankifsccode.qpkendra.com/v4/sitelink/${bankUrl}`;
  const pageTitle = `${bankName} - All ${totalCount} IFSC Codes & Branch Sitelinks | QPkendra`;
  const pageDesc = `Complete list of all ${totalCount} IFSC codes for ${bankName} branches across India. Find any branch IFSC code, address and contact.`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Bank IFSC Code | QPkendra" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />

        {/* BreadcrumbList Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bankifsccode.qpkendra.com/v4" },
            { "@type": "ListItem", "position": 2, "name": bankName, "item": `https://bankifsccode.qpkendra.com/v4/${bankUrl}` },
            { "@type": "ListItem", "position": 3, "name": "All IFSC Codes", "item": canonicalUrl }
          ]
        })}} />

        {/* ItemList Schema — first 100 branches for structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": `${bankName} IFSC Code List`,
          "description": pageDesc,
          "numberOfItems": totalCount,
          "itemListElement": branches.slice(0, 100).map((b, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": `${b.BRANCH} - ${b.IFSC}`,
            "url": `https://bankifsccode.qpkendra.com/v4/ifsc?q=${b.IFSC}`
          }))
        })}} />
      </Head>

      <div className="container mt-4 mb-5 pb-5">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb" style={{ background: 'none', padding: 0 }}>
            <li className="breadcrumb-item"><Link href="/v4" className="text-decoration-none text-muted fw-semibold" style={{ fontSize: '0.9rem' }}>Home</Link></li>
            <li className="breadcrumb-item"><Link href="/banks-v4" className="text-decoration-none text-muted fw-semibold" style={{ fontSize: '0.9rem' }}>Banks</Link></li>
            <li className="breadcrumb-item active fw-bold" aria-current="page" style={{ color: '#4a5568', fontSize: '0.9rem' }}>{bankName} - Sitelinks</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="bg-white border rounded p-4 mb-4" style={{ borderColor: '#e2e8f0' }}>
          <div className="d-flex align-items-center mb-2">
            <div className="bank-icon-bg me-3" style={{ width: '48px', height: '48px' }}>
              <BsBank size={24} color="#0a194f" />
            </div>
            <div>
              <h2 className="fw-bold mb-0" style={{ color: '#0a194f' }}>{bankName}</h2>
              <p className="text-muted mb-0">{totalCount} IFSC Codes &bull; All Branches Sitelink</p>
            </div>
          </div>
        </div>

        {/* Group by State */}
        {Object.entries(
          branches.reduce((acc, b) => {
            const state = b.STATE || 'UNKNOWN';
            if (!acc[state]) acc[state] = [];
            acc[state].push(b);
            return acc;
          }, {})
        )
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([state, stateBranches]) => (
            <div key={state} className="mb-4">
              <div className="d-flex align-items-center mb-3 pb-2 border-bottom">
                <BsGeoAlt className="me-2 text-muted" />
                <h5 className="fw-bold mb-0" style={{ color: '#0a194f' }}>{state}</h5>
                <span className="ms-2 badge bg-light text-muted border" style={{ fontSize: '0.75rem' }}>{stateBranches.length} branches</span>
              </div>

              <div className="row g-2">
                {stateBranches.map((branch) => (
                  <div className="col-12 col-sm-6 col-lg-4" key={branch.IFSC}>
                    <Link
                      href={`/v4/ifsc?q=${branch.IFSC}`}
                      className="text-decoration-none"
                    >
                      <div className="bg-white border rounded p-3 d-flex justify-content-between align-items-center" style={{ borderColor: '#e2e8f0', cursor: 'pointer', transition: 'border-color 0.2s' }}
                        onMouseOver={(e) => e.currentTarget.style.borderColor = '#0a194f'}
                        onMouseOut={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                      >
                        <div style={{ minWidth: 0 }}>
                          <div className="fw-bold small text-truncate" style={{ color: '#1e293b' }}>{branch.BRANCH}</div>
                          <div className="text-muted" style={{ fontSize: '0.75rem' }}>{branch.IFSC}</div>
                          <div className="text-muted text-truncate" style={{ fontSize: '0.7rem' }}>{branch.CITY1}{branch.CITY2 && branch.CITY2 !== branch.CITY1 ? `, ${branch.CITY2}` : ''}</div>
                        </div>
                        <BsChevronRight className="text-muted flex-shrink-0 ms-2" />
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const paths = bankname_db.map((bank) => ({
    params: {
      bankname: bank.BANK_NAME.replaceAll(' ', '-'),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const bankParam = params.bankname;
  const bankSearch = bankParam.toLowerCase();
  const bankRecord = bankname_db.find(
    (b) => b.BANK_NAME.replaceAll(' ', '-').toLowerCase() === bankSearch
  );

  if (!bankRecord) return { notFound: true };

  const jsonPath = path.join(process.cwd(), 'json', `${bankRecord.bank_id}.json`);
  let bankData = [];
  try {
    bankData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  } catch (e) {
    return { notFound: true };
  }

  // Only pass the fields needed for sitelinks to keep bundle size small
  const branches = bankData.map((item) => ({
    IFSC: item.IFSC,
    BRANCH: item.BRANCH || '',
    STATE: item.STATE || '',
    CITY1: item.CITY1 || '',
    CITY2: item.CITY2 || '',
  }));

  return {
    props: {
      bankName: bankRecord.BANK_NAME,
      bankUrl: bankParam,
      branches,
      totalCount: branches.length,
    },
  };
}
