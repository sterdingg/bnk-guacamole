import { useRouter } from 'next/router';
import { BsBank, BsSearch, BsArrowRightShort } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import fs from 'fs';
import path from 'path';
import bankname_db from '../../../json/bank_name.json';

export default function BankDynamicV4({ initialStates, bankName, bankUrl }) {
  const router = useRouter();

  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const [statesList, setStatesList] = useState(initialStates || []);
  const [citiesList, setCitiesList] = useState([]);
  const [branchesList, setBranchesList] = useState([]);
  
  const [stateFilter, setStateFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [branchFilter, setBranchFilter] = useState('');

  useEffect(() => {
    if (bankUrl && selectedState) {
       fetch(`/api/v4/bank-data?bank=${bankUrl}&state=${selectedState}`).then(r => r.json()).then(d => {
          if (d.cities) setCitiesList(d.cities);
          setSelectedCity('');
          setBranchesList([]);
       });
    }
  }, [bankUrl, selectedState]);

  useEffect(() => {
    if (bankUrl && selectedState && selectedCity) {
       fetch(`/api/v4/bank-data?bank=${bankUrl}&state=${selectedState}&city=${selectedCity}`).then(r => r.json()).then(d => {
          if (d.branches) setBranchesList(d.branches);
       });
    }
  }, [bankUrl, selectedState, selectedCity]);

  const filteredStates = statesList.filter(s => s.toLowerCase().includes(stateFilter.toLowerCase()));
  const filteredCities = citiesList.filter(c => c.toLowerCase().includes(cityFilter.toLowerCase()));
  const filteredBranches = branchesList.filter(b => b.BRANCH.toLowerCase().includes(branchFilter.toLowerCase()));

  // Fallback state
  if (router.isFallback) return <div className="container mt-5 text-center text-muted">Generating page, please wait...</div>;

  const canonicalUrl = `https://bankifsccode.qpkendra.com/v4/${bankUrl}`;
  const pageTitle = `${bankName} IFSC Code - All Branches, States & Cities | QPkendra`;
  const pageDesc = `Find IFSC codes for all ${bankName} branches across India. Browse by state and city to get branch address, contact, MICR code and more.`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Bank IFSC Code | QPkendra" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />

        {/* BreadcrumbList Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bankifsccode.qpkendra.com/v4" },
            { "@type": "ListItem", "position": 2, "name": "Banks", "item": "https://bankifsccode.qpkendra.com/banks-v4" },
            { "@type": "ListItem", "position": 3, "name": bankName, "item": canonicalUrl }
          ]
        })}} />

        {/* Organization Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": bankName,
          "url": canonicalUrl,
          "logo": "https://bankifsccode.qpkendra.com/assets/favicon.png",
          "description": pageDesc
        })}} />
      </Head>
      
      <div className="container mt-4 mb-5 pb-5">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb" style={{ background: 'none', padding: 0 }}>
            <li className="breadcrumb-item"><Link href="/v4" className="text-decoration-none text-muted fw-semibold" style={{ fontSize: '0.9rem' }}>Home</Link></li>
            <li className="breadcrumb-item"><Link href="/banks-v4" className="text-decoration-none text-muted fw-semibold" style={{ fontSize: '0.9rem' }}>Banks</Link></li>
            <li className="breadcrumb-item active fw-bold" aria-current="page" style={{ color: '#0a194f', fontSize: '0.9rem' }}>{bankName}</li>
          </ol>
        </nav>

        {/* Top Bank Card */}
        <div className="bg-white border rounded p-4 d-flex align-items-center mb-5" style={{ borderColor: '#e2e8f0' }}>
          <div className="bank-icon-bg me-4" style={{ width: '64px', height: '64px' }}>
            <BsBank size={32} color="#0a194f" />
          </div>
          <div>
            <h2 className="fw-bold mb-1" style={{ color: '#0a194f' }}>{bankName}</h2>
            <p className="text-muted mb-0">Select State and City to locate branches and IFSC codes.</p>
          </div>
        </div>

        {/* Main Selection Area */}
        <div className="row g-4">
          
          {/* Left Column: Select State */}
          <div className="col-12 col-lg-4">
            <div className="bg-white border rounded" style={{ borderColor: '#e2e8f0', overflow: 'hidden' }}>
              <div className="p-4 border-bottom">
                <div className="d-flex align-items-center mb-3">
                  <div className="step-circle step-active me-3">1</div>
                  <h4 className="fw-bold mb-0" style={{ color: '#0a194f' }}>Select State</h4>
                </div>
                <div className="position-relative">
                  <BsSearch className="position-absolute text-muted" size={14} style={{ top: '12px', left: '12px' }} />
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Filter states..." 
                    style={{ paddingLeft: '36px', backgroundColor: '#f8fafc', borderColor: '#e2e8f0', fontSize: '0.95rem' }} 
                    value={stateFilter}
                    onChange={e => setStateFilter(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="states-list" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                {filteredStates.map((state) => (
                  <div 
                    key={state}
                    className={`state-item ${selectedState === state ? 'state-active' : ''}`}
                    onClick={() => setSelectedState(state)}
                  >
                    {state}
                  </div>
                ))}
                {filteredStates.length === 0 && statesList.length > 0 && <div className="p-3 text-muted">No states found</div>}
                {statesList.length === 0 && <div className="p-3 text-muted">Loading states...</div>}
              </div>
            </div>
          </div>

          {/* Right Column: Select City & Branch */}
          <div className="col-12 col-lg-8">
            
            {/* Select City Card */}
            <div className="bg-white border rounded mb-4" style={{ borderColor: '#e2e8f0' }}>
              <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <div className={`step-circle ${selectedState ? 'step-active' : 'step-inactive'} me-3`}>2</div>
                  <h4 className="fw-bold mb-0" style={{ color: '#0a194f' }}>Select City</h4>
                </div>
                {selectedState && (
                  <span className="selection-pill">in {selectedState}</span>
                )}
              </div>
              <div className="p-4 border-bottom">
                <div className="position-relative">
                  <BsSearch className="position-absolute text-muted" size={14} style={{ top: '12px', left: '12px' }} />
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Filter cities..." 
                    style={{ paddingLeft: '36px', backgroundColor: '#f8fafc', borderColor: '#e2e8f0', fontSize: '0.95rem' }} 
                    value={cityFilter}
                    onChange={e => setCityFilter(e.target.value)}
                    disabled={!selectedState}
                  />
                </div>
              </div>
              <div className="p-4" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {!selectedState && <div className="text-muted text-center py-4">Please select a state first.</div>}
                {selectedState && citiesList.length === 0 && <div className="text-muted text-center py-4">Loading cities...</div>}
                <div className="row g-3">
                  {filteredCities.map(city => (
                    <div className="col-12 col-md-6" key={city}>
                      <div className="selection-card" onClick={() => setSelectedCity(city)} style={{ borderColor: selectedCity === city ? '#0a194f' : '#e2e8f0' }}>
                        <span>{city}</span>
                        <BsArrowRightShort size={24} className="text-muted" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Select Branch Card */}
            <div className="bg-white border rounded" style={{ borderColor: '#e2e8f0' }}>
              <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <div className={`step-circle ${selectedCity ? 'step-active' : 'step-inactive'} me-3`}>3</div>
                  <h4 className="fw-bold mb-0" style={{ color: '#0a194f' }}>Select Branch</h4>
                </div>
                {selectedCity && (
                  <span className="selection-pill">in {selectedCity}</span>
                )}
              </div>
              <div className="p-4 border-bottom">
                <div className="position-relative">
                  <BsSearch className="position-absolute text-muted" size={14} style={{ top: '12px', left: '12px' }} />
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Filter branches..." 
                    style={{ paddingLeft: '36px', backgroundColor: '#f8fafc', borderColor: '#e2e8f0', fontSize: '0.95rem' }} 
                    value={branchFilter}
                    onChange={e => setBranchFilter(e.target.value)}
                    disabled={!selectedCity}
                  />
                </div>
              </div>
              <div className="p-4" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {!selectedCity && <div className="text-muted text-center py-4">Please select a city first.</div>}
                {selectedCity && branchesList.length === 0 && <div className="text-muted text-center py-4">Loading branches...</div>}
                <div className="row g-3">
                  {filteredBranches.map(branch => (
                    <div className="col-12 col-md-6" key={branch.IFSC}>
                      <Link href={`/v4/${bankUrl}/${branch.BRANCH.replaceAll(" ", "-")}`} className="text-decoration-none">
                        <div className="selection-card">
                          <span>{branch.BRANCH}</span>
                          <BsArrowRightShort size={24} className="text-muted" />
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}

export async function getStaticPaths() {
  const paths = bankname_db.map(bank => ({
    params: { bank: bank.BANK_NAME.replaceAll(' ', '-') }
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const bankParam = params.bank;
  const bankSearch = bankParam.toLowerCase();
  const bankRecord = bankname_db.find(b => b.BANK_NAME.replaceAll(" ", "-").toLowerCase() === bankSearch);
  
  if (!bankRecord) return { notFound: true };

  const jsonPath = path.join(process.cwd(), 'json', `${bankRecord.bank_id}.json`);
  let bankData = [];
  try {
    bankData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  } catch(e) {
    return { notFound: true };
  }

  const states = Array.from(new Set(bankData.map(item => item.STATE))).sort();
  
  return {
    props: {
       initialStates: states,
       bankName: bankRecord.BANK_NAME,
       bankUrl: bankParam
    },
    revalidate: 86400
  };
}
