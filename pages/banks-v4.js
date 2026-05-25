import HeadSeo from '@/comp/HeadSeo';
import { BsSearch, BsBank } from 'react-icons/bs';
import bankname_db from '../json/bank_name';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function BanksV4() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (router.isReady && router.query.q) {
      setSearchQuery(router.query.q);
    }
  }, [router.isReady, router.query.q]);

  // Hardcoded popular banks to match the design exactly
  const popularBanks = [
    "State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank",
    "Punjab National Bank", "Bank of Baroda", "Kotak Mahindra", "Canara Bank"
  ];

  const filteredBanks = bankname_db.filter(bank => 
    bank.BANK_NAME.toLowerCase().includes(searchQuery.toLowerCase().replace(/-/g, ' '))
  );

  // Group all banks by first letter from the imported DB
  const groupedBanks = filteredBanks.reduce((acc, bank) => {
    let letter = bank.BANK_NAME.charAt(0).toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(bank);
    return acc;
  }, {});

  // Sort letters alphabetically
  const sortedLetters = Object.keys(groupedBanks).sort();

  return (
    <>
      <HeadSeo />
      <div className="container mt-4 mb-5 pb-4">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb" style={{ background: 'none', padding: 0 }}>
            <li className="breadcrumb-item"><a href="/v4" className="text-decoration-none text-muted fw-semibold" style={{ fontSize: '0.9rem' }}>Home</a></li>
            <li className="breadcrumb-item active fw-bold" aria-current="page" style={{ color: '#0a194f', fontSize: '0.9rem' }}>Banks</li>
          </ol>
        </nav>

        {/* Search Header */}
        <h2 className="fw-bold mt-4 mb-4" style={{ color: '#0a194f' }}>Select Bank</h2>
        
        <div className="search-container mb-5" style={{ maxWidth: '100%', border: '1px solid #e2e8f0', boxShadow: 'none' }}>
          <BsSearch className="ms-3 text-muted" size={18} />
          <input 
            type="text" 
            className="search-input py-2" 
            placeholder="Search for a bank (e.g., State Bank of India)" 
            style={{ fontSize: '1rem' }}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              router.replace({ pathname: '/banks-v4', query: { q: e.target.value } }, undefined, { shallow: true });
            }}
          />
        </div>

        {!searchQuery && (
          <>
            {/* Popular Banks */}
            <h4 className="fw-bold mb-4" style={{ color: '#0a194f' }}>Popular Banks</h4>
            <div className="row g-4 mb-5 pb-3">
              {popularBanks.map((bank, index) => (
                <div className="col-12 col-sm-6 col-md-3" key={index}>
                  <a href={`/v4/${bank.replaceAll(" ", "-")}`} className="text-decoration-none">
                    <div className="bank-card text-center d-flex flex-column align-items-center justify-content-center py-4" style={{ cursor: 'pointer' }}>
                      <div className="bank-icon-bg mb-3">
                        <BsBank size={24} color="#0a194f" />
                      </div>
                      <h6 className="fw-bold mb-0" style={{ color: '#0a194f', fontSize: '0.9rem' }}>{bank}</h6>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </>
        )}

        {/* All Banks */}
        <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-4">
          <h4 className="fw-bold mb-0" style={{ color: '#0a194f' }}>
            {searchQuery ? `Search Results (${filteredBanks.length})` : 'All Banks'}
          </h4>
          {!searchQuery && (
            <div className="alphabet-index text-muted fw-semibold small">
              <span className="mx-2">A</span>
              <span className="mx-2">B</span>
              <span className="mx-2">C</span>
              <span className="mx-2">...</span>
            </div>
          )}
        </div>

        {filteredBanks.length === 0 ? (
          <div className="text-center py-5">
            <h5 className="text-muted fw-bold">No banks found matching "{searchQuery}"</h5>
            <p className="text-muted small">Try a different search term or check spelling.</p>
          </div>
        ) : (
          <div className="all-banks-list">
            {sortedLetters.map(letter => (
              <div key={letter} className="mb-5">
                <h5 className="fw-bold mb-4" style={{ color: '#4a5568' }}>{letter}</h5>
                <div className="row g-4">
                  {groupedBanks[letter].map(bank => (
                    <div className="col-12 col-md-4" key={bank.bank_id}>
                      <a href={`/v4/${bank.BANK_NAME.replaceAll(" ", "-")}`} className="text-decoration-none" style={{ color: '#0a194f', fontSize: '0.95rem' }}>
                        {bank.BANK_NAME.replaceAll("_", " ")}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </>
  );
}
