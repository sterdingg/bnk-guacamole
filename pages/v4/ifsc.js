import HeadSeo from '@/comp/HeadSeo';
import { BsBank, BsFiles, BsInfoCircle, BsTelephone, BsClock, BsEnvelope, BsPrinter, BsShare, BsGeoAlt, BsChevronRight, BsGeoAltFill } from 'react-icons/bs';
import { SiGooglemaps } from 'react-icons/si';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import bnk_data from '../../json/bank_name_1.json';
import bankname_db from '../../json/bank_name.json';

export default function V4IfscPage() {
  const router = useRouter();
  const [details, setDetails] = useState(null);
  const [nearby, setNearby] = useState([]);
  const [bankName, setBankName] = useState('');
  const [bankUrl, setBankUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [copiedIfsc, setCopiedIfsc] = useState(false);
  const [preferredMap, setPreferredMap] = useState('both');
  const [preferredFont, setPreferredFont] = useState('default');
  const [hoveredDigitIndex, setHoveredDigitIndex] = useState(null);

  useEffect(() => {
    const savedMap = localStorage.getItem('preferredMapProvider');
    if (savedMap) setPreferredMap(savedMap);
    const savedFont = localStorage.getItem('preferredFont');
    if (savedFont) setPreferredFont(savedFont);
  }, []);

  // Load IFSC details when query is ready
  useEffect(() => {
    if (!router.isReady) return;
    const { q } = router.query;
    if (!q || q.length !== 11) {
      setLoading(false);
      setNotFound(true);
      return;
    }

    const ifscCode = q.toUpperCase();

    // Find matching bank from bank_name_1.json using IFSC prefix
    const matchingBank = bnk_data.find(item =>
      ifscCode.startsWith(item.IFSC.toUpperCase())
    );

    if (!matchingBank) {
      setLoading(false);
      setNotFound(true);
      return;
    }

    // Load the detailed JSON for that bank
    import(`../../json/${matchingBank.bank_id}.json`).then(mod => {
      const bankData = mod.default || [];
      const detail = bankData.find(rec => rec.IFSC.toUpperCase() === ifscCode);

      if (!detail) {
        setLoading(false);
        setNotFound(true);
        return;
      }

      setDetails(detail);
      setBankName(matchingBank.BANK_NAME);

      // Build bankUrl from bank_name.json for proper linking
      const bankRecord = bankname_db.find(b => b.bank_id === matchingBank.bank_id);
      if (bankRecord) {
        setBankUrl(bankRecord.BANK_NAME.replaceAll(' ', '-'));
      }

      // Get nearby branches (same city)
      const nearbyBranches = bankData
        .filter(item => item.CITY1 === detail.CITY1 && item.IFSC !== detail.IFSC)
        .slice(0, 4);
      setNearby(nearbyBranches);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
      setNotFound(true);
    });
  }, [router.isReady, router.query]);

  const getFontFamily = () => {
    if (preferredFont === 'didone') return '"Didone Room", serif';
    if (preferredFont === 'jetbrains') return '"JetBrains Mono", monospace';
    if (preferredFont === 'archivo') return '"Archivo", sans-serif';
    if (preferredFont === 'rajdhani') return '"Rajdhani", sans-serif';
    return 'system-ui, -apple-system, sans-serif';
  };
  const currentFontFamily = getFontFamily();

  const handleCopyIfsc = () => {
    if (!details?.IFSC) return;
    navigator.clipboard.writeText(details.IFSC);
    setCopiedIfsc(true);
    setTimeout(() => setCopiedIfsc(false), 2000);
  };

  const handlePrint = () => { window.print(); };

  const handleEmail = () => {
    if (!details) return;
    const subject = encodeURIComponent(`${bankName} - ${details.BRANCH} Branch Details`);
    const body = encodeURIComponent(
      `Bank: ${bankName}\nBranch: ${details.BRANCH}\nIFSC Code: ${details.IFSC}\nAddress: ${details.ADDRESS}\nContact: +91 ${details.STD_CODE} ${details.PHONE}\n\nView more at: ${window.location.href}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleShare = async () => {
    if (!details) return;
    const shareData = {
      title: `${bankName} - ${details.BRANCH} Branch`,
      text: `Check out the details for ${bankName}, ${details.BRANCH} branch. IFSC: ${details.IFSC}`,
      url: window.location.href,
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch (err) { console.error('Error sharing:', err); }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('URL copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center text-muted">
        <div className="spinner-border text-primary mb-3" role="status"><span className="visually-hidden">Loading...</span></div>
        <p>Looking up IFSC code...</p>
      </div>
    );
  }

  if (notFound || !details) {
    return (
      <div className="container mt-5 text-center">
        <HeadSeo />
        <div className="py-5">
          <h2 className="fw-bold mb-3" style={{ color: '#0a194f' }}>IFSC Code Not Found</h2>
          <p className="text-muted mb-4">The IFSC code you entered could not be found. Please check the code and try again.</p>
          <Link href="/v4/searchifsc" className="btn fw-semibold px-4 py-2" style={{ backgroundColor: '#0a194f', color: 'white', borderRadius: '6px' }}>
            Search IFSC
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <HeadSeo />
      <Head>
        <title>{details.IFSC} - {bankName} {details.BRANCH} Branch IFSC Code</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700&family=JetBrains+Mono:wght@400;600;700&family=Rajdhani:wght@400;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="container mt-4 mb-5 pb-5">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb" style={{ background: 'none', padding: 0 }}>
            <li className="breadcrumb-item"><Link href="/v4" className="text-decoration-none text-muted fw-semibold" style={{ fontSize: '0.9rem' }}>Home</Link></li>
            <li className="breadcrumb-item"><Link href={`/v4/${bankUrl}`} className="text-decoration-none text-muted fw-semibold" style={{ fontSize: '0.9rem' }}>{bankName}</Link></li>
            <li className="breadcrumb-item active fw-bold" aria-current="page" style={{ color: '#4a5568', fontSize: '0.9rem' }}>{details.IFSC}</li>
          </ol>
        </nav>

        {/* Top Card */}
        <div className="bg-white border rounded p-4 mb-4" style={{ borderColor: '#e2e8f0' }}>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center">
            <div className="mb-4 mb-md-0">
              <span className="text-muted small fw-bold text-uppercase d-flex align-items-center mb-2">
                <BsBank className="me-2" size={16} /> BRANCH DETAILS
              </span>
              <h2 className="fw-bold mb-1" style={{ color: '#0a194f' }}>{bankName}</h2>
              <p className="text-muted mb-0">{details.BRANCH}, {details.CITY1}</p>
            </div>
            <div className="bg-light p-3 rounded" style={{ border: '1px solid #e2e8f0', minWidth: '280px' }}>
              <div className="text-muted small fw-bold mb-1 text-end">IFSC CODE</div>
              <div className="d-flex align-items-center justify-content-between">
                <h2 className="fw-bold mb-0 me-4" style={{ color: '#0a194f', letterSpacing: '1px' }}>{details.IFSC}</h2>
                <button onClick={handleCopyIfsc} className="btn d-flex align-items-center fw-semibold px-3" style={{ backgroundColor: '#20c997', color: 'white', border: 'none' }}>
                  <BsFiles className="me-2" /> {copiedIfsc ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {/* Left Column */}
          <div className="col-12 col-lg-8">

            {/* Branch Information */}
            <div className="bg-white border rounded p-4 mb-4" style={{ borderColor: '#e2e8f0', borderRadius: '8px' }}>
              <h4 className="fw-bold mb-4 d-flex align-items-center pb-3 border-bottom" style={{ color: '#1e293b' }}>
                <BsInfoCircle className="me-2 text-muted" size={24} /> Branch Information
              </h4>

              <div className="row g-4 pt-2">
                {/* Row 1: Bank Name & Branch Name */}
                <div className="col-12 col-md-6">
                  <div className="text-muted fw-bold text-uppercase mb-1" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>Bank Name</div>
                  <div className="fw-bold" style={{ color: '#1e293b', fontSize: '1.1rem', fontFamily: currentFontFamily }}>{details.BANK}</div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="text-muted fw-bold text-uppercase mb-1" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>Branch Name</div>
                  <div className="fw-bold" style={{ color: '#1e293b', fontSize: '1.1rem', fontFamily: currentFontFamily }}>{details.BRANCH}</div>
                </div>

                {/* Row 2: IFSC & MICR Code */}
                <div className="col-12 col-md-6">
                  <div className="text-muted fw-bold text-uppercase mb-1" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>IFSC Code</div>
                  <div className="fw-bold d-flex align-items-center" style={{ color: '#1e293b', fontSize: '1.25rem', letterSpacing: '1px', fontFamily: currentFontFamily }}>
                    {details.IFSC}
                    <span onClick={handleCopyIfsc} className="ms-3 badge bg-light text-primary border" style={{ fontSize: '0.65rem', padding: '0.35rem 0.6rem', cursor: 'pointer', fontFamily: 'system-ui, -apple-system, sans-serif', letterSpacing: 'normal' }}>{copiedIfsc ? 'COPIED!' : 'COPY'}</span>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="text-muted fw-bold text-uppercase mb-1" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>MICR Code</div>
                  <div className="fw-bold" style={{ color: '#1e293b', fontSize: '1.25rem', letterSpacing: '1px', fontFamily: currentFontFamily }}>{details.MICR_CODE || 'N/A'}</div>
                </div>

                {/* Row 3: Bank Code & Branch Code */}
                <div className="col-12 col-md-6">
                  <div className="text-muted fw-bold text-uppercase mb-1" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>Bank Code</div>
                  <div className="fw-bold" style={{ color: '#1e293b', fontSize: '1.25rem', letterSpacing: '1px', fontFamily: currentFontFamily }}>{details.IFSC?.slice(0, 5)}</div>
                  <div className="text-muted fst-italic mt-1" style={{ fontSize: '0.75rem' }}>(First 5 Letters of IFSC Code)</div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="text-muted fw-bold text-uppercase mb-1" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>Branch Code</div>
                  <div className="fw-bold" style={{ color: '#1e293b', fontSize: '1.25rem', letterSpacing: '1px', fontFamily: currentFontFamily }}>{details.IFSC?.slice(-6)}</div>
                  <div className="text-muted fst-italic mt-1" style={{ fontSize: '0.75rem' }}>(Last 6 Letters of IFSC Code)</div>
                </div>

                {/* Row 4: State */}
                <div className="col-12">
                  <div className="text-muted fw-bold text-uppercase mb-1" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>State</div>
                  <div className="fw-bold" style={{ color: '#1e293b', fontSize: '1.1rem', fontFamily: currentFontFamily }}>{details.STATE}</div>
                </div>

                {/* Row 5: Address */}
                <div className="col-12">
                  <div className="text-muted fw-bold text-uppercase mb-1" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>Address</div>
                  <div className="fw-bold lh-base" style={{ color: '#1e293b', fontSize: '1rem', maxWidth: '80%', fontFamily: currentFontFamily }}>
                    {details.ADDRESS}
                  </div>
                </div>

                {/* Row 6: Contact & Working Hours */}
                <div className="col-12 col-md-6">
                  <div className="text-muted fw-bold text-uppercase mb-1" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>Contact Number</div>
                  <div className="fw-bold d-flex align-items-center" style={{ color: '#2563eb', fontSize: '1.1rem', fontFamily: currentFontFamily }}>
                    <BsTelephone className="me-2" size={18} /> +91 {details.STD_CODE} {details.PHONE}
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="text-muted fw-bold text-uppercase mb-1" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>Working Hours</div>
                  <div className="fw-bold d-flex align-items-center" style={{ color: '#1e293b', fontSize: '1rem', fontFamily: currentFontFamily }}>
                    <BsClock className="me-2 text-muted" size={16} /> 09:30 AM - 03:30 PM (Mon-Sat*)
                  </div>
                </div>
              </div>
            </div>

            {/* IFSC Code Map */}
            <div className="mb-5 pb-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="fw-bold text-muted text-uppercase" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>Digit Position</div>
                <div className="fw-bold text-muted" style={{ fontSize: '0.9rem' }}>1 &rarr; 11</div>
              </div>

              <style jsx>{`
                .digit-box {
                  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                  cursor: pointer;
                }
                .digit-box:hover {
                  transform: translateY(-6px);
                  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.3), 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
                  border-color: #0f172a !important;
                  background-color: #ffffff !important;
                  z-index: 10;
                }
              `}</style>

              <div className="d-grid gap-2 mb-2" style={{ gridTemplateColumns: 'repeat(11, 1fr)' }}>
                {details.IFSC?.padEnd(11, '0').split('').map((char, i) => {
                  const isBankCode = i < 4;
                  const isControl = i === 4;
                  const isBranchCode = i > 4;

                  let bgClass = "bg-light";
                  let textClass = "text-primary";
                  if (isBankCode) { bgClass = "bg-opacity-10 bg-primary"; textClass = "text-dark"; }
                  if (isControl) { bgClass = "bg-light"; textClass = "text-dark"; }
                  if (isBranchCode) { bgClass = "bg-opacity-10 bg-info"; textClass = "text-primary"; }

                  return (
                    <div
                      key={i}
                      className={`border rounded shadow-sm d-flex flex-column align-items-center justify-content-center digit-box position-relative ${bgClass}`}
                      style={{ height: '65px', borderColor: '#e2e8f0' }}
                      onMouseEnter={() => setHoveredDigitIndex(i)}
                      onMouseLeave={() => setHoveredDigitIndex(null)}
                    >
                      <div className="text-muted mb-1" style={{ fontSize: '0.75rem', fontFamily: currentFontFamily }}>{i + 1}</div>
                      <div className={`fw-bold ${textClass}`} style={{ fontSize: '1.25rem', fontFamily: currentFontFamily }}>{char}</div>
                    </div>
                  );
                })}
              </div>

              {/* Brackets and Labels */}
              <div className="d-grid gap-2 mt-3 text-center" style={{ gridTemplateColumns: 'repeat(11, 1fr)', transition: 'all 0.3s' }}>
                <div style={{ gridColumn: 'span 4', opacity: hoveredDigitIndex !== null && hoveredDigitIndex >= 4 ? 0.3 : 1, transition: 'opacity 0.2s' }}>
                  <div style={{ borderTop: `2px solid ${hoveredDigitIndex !== null && hoveredDigitIndex < 4 ? '#0a194f' : '#cbd5e1'}`, borderLeft: `1px solid ${hoveredDigitIndex !== null && hoveredDigitIndex < 4 ? '#0a194f' : '#cbd5e1'}`, borderRight: `1px solid ${hoveredDigitIndex !== null && hoveredDigitIndex < 4 ? '#0a194f' : '#cbd5e1'}`, height: '8px', borderTopLeftRadius: '4px', borderTopRightRadius: '4px', transition: 'border-color 0.2s' }}></div>
                  <div className="fw-bold mt-2" style={{ color: '#0a194f', fontSize: '0.85rem' }}>BANK CODE</div>
                  <div className="text-muted" style={{ fontSize: '0.7rem' }}>First 4 alphabets representing the bank name.</div>
                </div>
                <div style={{ gridColumn: 'span 1', opacity: hoveredDigitIndex !== null && hoveredDigitIndex !== 4 ? 0.3 : 1, transition: 'opacity 0.2s' }}>
                  <div className="mx-auto" style={{ borderLeft: `2px solid ${hoveredDigitIndex === 4 ? '#0a194f' : '#cbd5e1'}`, height: '8px', width: '1px', transition: 'border-color 0.2s' }}></div>
                  <div className="fw-bold mt-2" style={{ color: '#0a194f', fontSize: '0.85rem' }}>CONTROL</div>
                  <div className="text-muted" style={{ fontSize: '0.7rem' }}>Reserved &apos;0&apos; for future use.</div>
                </div>
                <div style={{ gridColumn: 'span 6', opacity: hoveredDigitIndex !== null && hoveredDigitIndex <= 4 ? 0.3 : 1, transition: 'opacity 0.2s' }}>
                  <div style={{ borderTop: `2px solid ${hoveredDigitIndex !== null && hoveredDigitIndex > 4 ? '#0056b3' : '#cbd5e1'}`, borderLeft: `1px solid ${hoveredDigitIndex !== null && hoveredDigitIndex > 4 ? '#0056b3' : '#cbd5e1'}`, borderRight: `1px solid ${hoveredDigitIndex !== null && hoveredDigitIndex > 4 ? '#0056b3' : '#cbd5e1'}`, height: '8px', borderTopLeftRadius: '4px', borderTopRightRadius: '4px', transition: 'border-color 0.2s' }}></div>
                  <div className="fw-bold mt-2" style={{ color: '#0056b3', fontSize: '0.85rem' }}>BRANCH CODE</div>
                  <div className="text-muted" style={{ fontSize: '0.7rem' }}>Last 6 digits defining the specific branch location.</div>
                </div>
              </div>

              <div className="text-end mt-4 fst-italic" style={{ color: '#64748b', fontSize: '0.85rem' }}>
                - IFSC Character Map | QPkendra
              </div>
            </div>

            {/* Map Block */}
            <div className="bg-white border rounded p-2" style={{ borderColor: '#e2e8f0' }}>
              <div className="d-flex flex-column flex-sm-row gap-2 w-100" style={{ height: '220px' }}>
                {(preferredMap === 'both' || preferredMap === 'google') && (
                  <div className="h-100 flex-grow-1" style={{ flexBasis: preferredMap === 'both' ? '50%' : '100%' }}>
                    <a
                      href={`https://www.google.com/maps/search/${details.BANK} ${details.BRANCH},${details.STATE}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-100 h-100 rounded d-flex flex-column align-items-center justify-content-center text-decoration-none position-relative overflow-hidden shadow-sm"
                      style={{
                        backgroundImage: 'url("/assets/google_map_bg.png")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <div className="position-absolute w-100 h-100" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
                      <div className="bg-white rounded shadow-sm d-flex flex-column align-items-center justify-content-center position-relative transition-all" style={{ width: '70px', height: '70px', zIndex: 1 }}>
                        <SiGooglemaps size={20} color="#1a73e8" className="mb-1" />
                        <div className="fw-bold" style={{ color: '#334155', fontSize: '0.65rem' }}>Google Maps</div>
                      </div>
                    </a>
                  </div>
                )}
                {(preferredMap === 'both' || preferredMap === 'mappls') && (
                  <div className="h-100 flex-grow-1" style={{ flexBasis: preferredMap === 'both' ? '50%' : '100%' }}>
                    <a
                      href={`https://www.mappls.com/search=${details.BANK} ${details.BRANCH},${details.STATE}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-100 h-100 rounded d-flex flex-column align-items-center justify-content-center text-decoration-none position-relative overflow-hidden shadow-sm"
                      style={{
                        backgroundImage: 'url("/assets/mappls_bg.png")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <div className="position-absolute w-100 h-100" style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}></div>
                      <div className="bg-white rounded shadow-sm d-flex flex-column align-items-center justify-content-center position-relative transition-all" style={{ width: '70px', height: '70px', zIndex: 1 }}>
                        <BsGeoAltFill size={20} color="#10b981" className="mb-1" />
                        <div className="fw-bold" style={{ color: '#334155', fontSize: '0.65rem' }}>Mappls</div>
                      </div>
                    </a>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div className="col-12 col-lg-4">

            {/* Share Details */}
            <div className="bg-white border rounded p-4 mb-4" style={{ borderColor: '#e2e8f0' }}>
              <div className="text-muted small fw-bold text-uppercase mb-3">Share Details</div>
              <div className="d-flex gap-2">
                <button onClick={handleEmail} className="btn flex-grow-1 fw-semibold d-flex align-items-center justify-content-center" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', color: '#1e293b' }}>
                  <BsEnvelope className="me-2" /> Email
                </button>
                <button onClick={handlePrint} className="btn flex-grow-1 fw-semibold d-flex align-items-center justify-content-center" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', color: '#1e293b' }}>
                  <BsPrinter className="me-2" /> Print
                </button>
                <button onClick={handleShare} className="btn d-flex align-items-center justify-content-center" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', color: '#1e293b', width: '46px' }}>
                  <BsShare />
                </button>
              </div>
            </div>

            {/* Nearby Branches */}
            <div className="bg-white border rounded p-4" style={{ borderColor: '#e2e8f0' }}>
              <h5 className="fw-bold mb-4 d-flex align-items-center pb-2 border-bottom" style={{ color: '#1e293b' }}>
                <BsGeoAlt className="me-2 text-muted" style={{ transform: 'rotate(45deg)' }} /> Nearby Branches
              </h5>

              <div className="d-flex flex-column">
                {nearby.length === 0 && <div className="text-muted small text-center py-3">No nearby branches found</div>}
                {nearby.map((b, i) => (
                  <Link href={`/v4/${bankUrl}/${b.BRANCH.replaceAll(" ", "-")}`} key={i} className="text-decoration-none text-dark">
                    <div className="py-3 d-flex justify-content-between align-items-center border-bottom" style={{ cursor: 'pointer' }}>
                      <div>
                        <div className="fw-bold small" style={{ color: '#1e293b' }}>{b.BRANCH}</div>
                        <div className="text-muted small" style={{ fontSize: '0.8rem' }}>{b.IFSC}</div>
                      </div>
                      <BsChevronRight className="text-muted" />
                    </div>
                  </Link>
                ))}
              </div>

              {nearby.length > 0 && (
                <div className="mt-4 pt-2">
                  <Link href={`/v4/${bankUrl}`} className="text-decoration-none fw-bold small" style={{ color: '#0056b3' }}>View all branches in {details.CITY1} &rarr;</Link>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
