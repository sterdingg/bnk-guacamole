import { BsMap, BsHash, BsClockHistory, BsBoxArrowRight, BsInfoCircle } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import bankname_db from '../../json/bank_name';
import Link from 'next/link';
import Head from 'next/head';

export default function SearchIFSC() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('location');
  
  // Cascading states
  const [banks] = useState(bankname_db);
  const [selectedBank, setSelectedBank] = useState('');
  
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');

  // IFSC search state
  const [ifscInput, setIfscInput] = useState('');

  // Recent searches state
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse recent searches');
      }
    }
  }, []);

  const saveRecentSearch = (searchItem) => {
    const updated = [searchItem, ...recentSearches.filter(s => s.ifsc !== searchItem.ifsc)].slice(0, 4);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const clearHistory = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  // Fetch states when bank changes
  useEffect(() => {
    if (selectedBank) {
      fetch(`/api/v4/cascading?bank_id=${selectedBank}`)
        .then(res => res.json())
        .then(data => {
          setStates(data.states || []);
          setSelectedState('');
          setCities([]);
          setSelectedCity('');
          setBranches([]);
          setSelectedBranch('');
        })
        .catch(err => console.error('Failed to fetch states:', err));
    } else {
      setStates([]);
      setSelectedState('');
      setCities([]);
      setSelectedCity('');
      setBranches([]);
      setSelectedBranch('');
    }
  }, [selectedBank]);

  // Fetch cities when state changes
  useEffect(() => {
    if (selectedBank && selectedState) {
      fetch(`/api/v4/cascading?bank_id=${selectedBank}&state=${encodeURIComponent(selectedState)}`)
        .then(res => res.json())
        .then(data => {
          setCities(data.cities || []);
          setSelectedCity('');
          setBranches([]);
          setSelectedBranch('');
        })
        .catch(err => console.error('Failed to fetch cities:', err));
    } else {
      setCities([]);
      setSelectedCity('');
      setBranches([]);
      setSelectedBranch('');
    }
  }, [selectedBank, selectedState]);

  // Fetch branches when city changes
  useEffect(() => {
    if (selectedBank && selectedState && selectedCity) {
      fetch(`/api/v4/cascading?bank_id=${selectedBank}&state=${encodeURIComponent(selectedState)}&city=${encodeURIComponent(selectedCity)}`)
        .then(res => res.json())
        .then(data => {
          setBranches(data.branches || []);
          setSelectedBranch('');
        })
        .catch(err => console.error('Failed to fetch branches:', err));
    } else {
      setBranches([]);
      setSelectedBranch('');
    }
  }, [selectedBank, selectedState, selectedCity]);

  const handleLocationSubmit = (e) => {
    e.preventDefault();
    if (!selectedBank || !selectedBranch) return;

    const branchObj = branches.find(b => b.BRANCH === selectedBranch);
    const bankObj = banks.find(b => b.bank_id.toString() === selectedBank.toString());

    if (branchObj && bankObj) {
      const bankUrl = bankObj.BANK_NAME.replaceAll(' ', '-');
      const branchUrl = branchObj.BRANCH.replaceAll(' ', '-');

      saveRecentSearch({
        bankName: bankObj.BANK_NAME,
        branchName: branchObj.BRANCH,
        ifsc: branchObj.IFSC,
        location: `${branchObj.CITY1}, ${branchObj.STATE}`,
        url: `/v4/${bankUrl}/${branchUrl}`
      });

      router.push(`/v4/${bankUrl}/${branchUrl}`);
    }
  };

  const handleIfscSubmit = (e) => {
    e.preventDefault();
    if (ifscInput.trim().length === 11) {
      router.push(`/v4/ifsc?q=${ifscInput.trim().toUpperCase()}`);
    } else {
      alert('Please enter a valid 11-character IFSC code');
    }
  };

  return (
    <>
      <Head>
        <title>Search IFSC Code of Any Bank Branch in India | QPkendra</title>
        <meta name="description" content="Find IFSC code of any bank branch in India instantly. Search by bank name, state, city and branch or directly enter the IFSC code. Get address, MICR code and contact details." />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://bankifsccode.qpkendra.com/v4/searchifsc" />
        <meta name="keywords" content="IFSC code, bank branch IFSC, find IFSC code, search IFSC, Indian bank IFSC" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Search IFSC Code of Any Bank Branch in India | QPkendra" />
        <meta property="og:description" content="Find IFSC code of any bank branch in India instantly. Search by bank name, state, city and branch or enter IFSC directly." />
        <meta property="og:url" content="https://bankifsccode.qpkendra.com/v4/searchifsc" />
        <meta property="og:site_name" content="Bank IFSC Code | QPkendra" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Search IFSC Code | QPkendra" />
        <meta name="twitter:description" content="Find IFSC code of any bank branch in India instantly." />

        {/* BreadcrumbList Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bankifsccode.qpkendra.com/v4" },
            { "@type": "ListItem", "position": 2, "name": "Search IFSC", "item": "https://bankifsccode.qpkendra.com/v4/searchifsc" }
          ]
        })}} />

        {/* FAQPage Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is an IFSC code?",
              "acceptedAnswer": { "@type": "Answer", "text": "IFSC (Indian Financial System Code) is an 11-character alphanumeric code that uniquely identifies a bank branch for electronic fund transfers like NEFT and RTGS." }
            },
            {
              "@type": "Question",
              "name": "How do I find the IFSC code of a bank branch?",
              "acceptedAnswer": { "@type": "Answer", "text": "Select your bank, then state, then city and finally the branch from the dropdowns. The IFSC code and full branch details will be shown." }
            },
            {
              "@type": "Question",
              "name": "How many characters are in an IFSC code?",
              "acceptedAnswer": { "@type": "Answer", "text": "An IFSC code is exactly 11 characters long. The first 4 represent the bank, the 5th is always 0, and the last 6 identify the branch." }
            }
          ]
        })}} />

        {/* WebSite / SearchAction Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Bank IFSC Code | QPkendra",
          "url": "https://bankifsccode.qpkendra.com",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://bankifsccode.qpkendra.com/v4/ifsc?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })}} />
      </Head>
      
      {/* Breadcrumbs */}
      <div className="bg-light py-2 border-bottom">
        <div className="container">
          <small className="text-muted fw-semibold">
            <Link href="/" className="text-decoration-none text-muted">Home</Link> &rsaquo; <span style={{ color: '#0a194f' }}>Find IFSC</span>
          </small>
        </div>
      </div>

      <div className="container py-5">
        <div className="mb-5">
          <h1 className="fw-bold mb-2" style={{ color: '#0a194f' }}>Locate Bank Branch IFSC</h1>
          <p className="text-muted mb-0" style={{ maxWidth: '600px', fontSize: '1.05rem' }}>
            Use our progressive search to pinpoint the exact IFSC code for any bank branch in India. Select your bank to begin.
          </p>
        </div>

        <div className="row g-4">
          {/* Main Search Column */}
          <div className="col-12 col-lg-8">
            <div className="card shadow-sm border-0 rounded-3 overflow-hidden mb-4">
              {/* Tabs */}
              <div className="search-tabs">
                <div 
                  className={`search-tab ${activeTab === 'location' ? 'active' : ''}`}
                  onClick={() => setActiveTab('location')}
                >
                  <BsMap className="me-2 mb-1" /> Search by Location
                </div>
                <div 
                  className={`search-tab ${activeTab === 'ifsc' ? 'active' : ''}`}
                  onClick={() => setActiveTab('ifsc')}
                >
                  <BsHash className="me-2 mb-1" /> Search by IFSC
                </div>
              </div>

              {/* Tab Content */}
              <div className="card-body p-4 p-md-5">
                {activeTab === 'location' && (
                  <form onSubmit={handleLocationSubmit}>
                    {/* Bank Selection */}
                    <div className="mb-4">
                      <label className="form-label text-muted fw-bold small text-uppercase mb-2">1. Select Bank</label>
                      <select 
                        className="form-select form-select-custom w-100" 
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                      >
                        <option value="">Choose a Bank...</option>
                        {banks.map(bank => (
                          <option key={bank.bank_id} value={bank.bank_id}>{bank.BANK_NAME}</option>
                        ))}
                      </select>
                    </div>

                    {/* State Selection */}
                    <div className="mb-4">
                      <label className="form-label text-muted fw-bold small text-uppercase mb-2">2. Select State</label>
                      <select 
                        className="form-select form-select-custom w-100" 
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                        disabled={!selectedBank || states.length === 0}
                      >
                        <option value="">{selectedBank ? (states.length === 0 ? 'Loading...' : 'Choose a State...') : 'Pending Bank Selection...'}</option>
                        {states.map(state => (
                          <option key={state} value={state}>{(state || '').replaceAll('_', ' ')}</option>
                        ))}
                      </select>
                    </div>

                    {/* City Selection */}
                    <div className="mb-4">
                      <label className="form-label text-muted fw-bold small text-uppercase mb-2">3. Select City</label>
                      <select 
                        className="form-select form-select-custom w-100" 
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        disabled={!selectedState || cities.length === 0}
                      >
                        <option value="">{selectedState ? (cities.length === 0 ? 'Loading...' : 'Choose a City...') : 'Pending State Selection...'}</option>
                        {cities.map(city => (
                          <option key={city} value={city}>{(city || '').replaceAll('_', ' ')}</option>
                        ))}
                      </select>
                    </div>

                    {/* Branch Selection */}
                    <div className="mb-5">
                      <label className="form-label text-muted fw-bold small text-uppercase mb-2">4. Select Branch</label>
                      <select 
                        className="form-select form-select-custom w-100" 
                        value={selectedBranch}
                        onChange={(e) => setSelectedBranch(e.target.value)}
                        disabled={!selectedCity || branches.length === 0}
                      >
                        <option value="">{selectedCity ? (branches.length === 0 ? 'Loading...' : 'Choose a Branch...') : 'Pending City Selection...'}</option>
                        {branches.map((branch, idx) => (
                          <option key={idx} value={branch.BRANCH}>{branch.BRANCH}</option>
                        ))}
                      </select>
                    </div>

                    <div className="d-flex justify-content-end">
                      <button 
                        type="submit" 
                        className="btn fw-semibold px-4 py-2"
                        style={{ backgroundColor: '#0a194f', color: 'white', borderRadius: '6px' }}
                        disabled={!selectedBranch}
                      >
                        Find Branch Details <BsBoxArrowRight className="ms-2 mb-1" />
                      </button>
                    </div>
                  </form>
                )}

                {activeTab === 'ifsc' && (
                  <form onSubmit={handleIfscSubmit}>
                    <div className="mb-4">
                      <label className="form-label text-muted fw-bold small text-uppercase mb-2">Enter IFSC Code</label>
                      <input 
                        type="text" 
                        className="form-control form-select-custom w-100" 
                        placeholder="e.g. SBIN0000691"
                        value={ifscInput}
                        onChange={(e) => setIfscInput(e.target.value.toUpperCase())}
                        maxLength={11}
                      />
                      <div className="form-text mt-2">The IFSC code must be exactly 11 characters long.</div>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button 
                        type="submit" 
                        className="btn fw-semibold px-4 py-2"
                        style={{ backgroundColor: '#0a194f', color: 'white', borderRadius: '6px' }}
                        disabled={ifscInput.trim().length !== 11}
                      >
                        Search Code <BsBoxArrowRight className="ms-2 mb-1" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Understanding IFSC Card */}
            <div className="card shadow-sm border-0 rounded-3 bg-light p-4 p-md-5">
              <div className="d-flex align-items-center mb-3">
                <BsInfoCircle size={24} className="text-primary me-3" />
                <h4 className="fw-bold mb-0" style={{ color: '#0a194f' }}>Understanding IFSC</h4>
              </div>
              <p className="text-muted mb-0">
                The Indian Financial System Code (IFSC) is an 11-character alphanumeric code that uniquely identifies a bank branch participating in the two main Electronic Funds Settlement Systems in India: the Real Time Gross Settlement (RTGS) and the National Electronic Funds Transfer (NEFT) systems.
              </p>
            </div>
          </div>

          {/* Right Sidebar Column */}
          <div className="col-12 col-lg-4">
            
            {/* Recent Searches */}
            <div className="card shadow-sm border-0 rounded-3 mb-4">
              <div className="card-header bg-white border-bottom p-4">
                <h5 className="fw-bold mb-0 d-flex align-items-center" style={{ color: '#0a194f' }}>
                  <BsClockHistory className="me-2" /> Recent Searches
                </h5>
              </div>
              
              {recentSearches.length === 0 ? (
                <div className="card-body p-4 text-center text-muted">
                  <small>No recent searches yet.</small>
                </div>
              ) : (
                <>
                  <div className="card-body p-0">
                    {recentSearches.map((item, idx) => (
                      <div key={idx} className="recent-search-item">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <small className="text-muted fw-bold">{item.bankName}</small>
                          <small className="text-primary fw-semibold">{item.ifsc}</small>
                        </div>
                        <div className="fw-bold mb-1" style={{ color: '#1e293b' }}>
                          <Link href={item.url} className="text-decoration-none text-dark">
                            {item.branchName}
                          </Link>
                        </div>
                        <small className="text-muted d-block">{item.location}</small>
                      </div>
                    ))}
                  </div>
                  <div className="card-footer bg-light text-center border-top p-3">
                    <button onClick={clearHistory} className="btn btn-link text-decoration-none fw-bold" style={{ color: '#0a194f', fontSize: '0.9rem' }}>
                      Clear History
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Promo Card */}
            <div className="promo-card-dark shadow-sm">
              <div className="position-relative" style={{ zIndex: 1 }}>
                <h4 className="fw-bold mb-3">Need Bulk Data?</h4>
                <p className="mb-4 text-white-50" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Integrate our robust IFSC routing API directly into your financial applications.
                </p>
                <Link href="/api-docs" className="btn btn-light fw-bold px-4 py-2" style={{ color: '#0a194f' }}>
                  View API Docs
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
