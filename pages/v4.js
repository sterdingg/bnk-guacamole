import HeadSeo from '@/comp/HeadSeo';
import { BsSearch, BsCheckCircle, BsBank, BsBuilding } from 'react-icons/bs';
import { BsLightningFill, BsUiChecks, BsDisplay } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function V4() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState({ banks: [], branches: [] });
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim().length >= 3) {
        setIsSearching(true);
        fetch(`/api/v4/global-search?q=${encodeURIComponent(searchQuery.trim())}`)
          .then(res => res.json())
          .then(data => {
            setResults(data);
            setIsSearching(false);
            setShowDropdown(true);
          })
          .catch(() => setIsSearching(false));
      } else {
        setResults({ banks: [], branches: [] });
        setShowDropdown(false);
      }
    }, 300); // debounce 300ms

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/banks-v4?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      <HeadSeo />
      <div className="container mt-5 pt-4 text-center">
        <h1 className="hero-heading mb-3">Find Bank IFSC & MICR Codes Instantly.</h1>
        <p className="hero-subheading mb-4">
          Search our up-to-date database of all Indian banks and branches to quickly find accurate routing codes.
        </p>

        <div className="position-relative mx-auto" style={{ maxWidth: '600px', zIndex: 1000 }}>
          <form onSubmit={handleSearch} className="search-container mb-1">
            <BsSearch className="ms-3 text-muted" size={20} />
            <input 
              type="text" 
              className="search-input py-2" 
              placeholder="Search by Bank Name or Branch..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => { if(searchQuery.length >= 3) setShowDropdown(true); }}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            />
            <button type="submit" className="search-btn ms-2">Search</button>
          </form>

          {showDropdown && (results.banks.length > 0 || results.branches.length > 0 || isSearching) && (
            <div className="position-absolute w-100 bg-white border rounded shadow mt-1 text-start" style={{ top: '100%', left: 0, maxHeight: '400px', overflowY: 'auto' }}>
              {isSearching ? (
                <div className="p-3 text-muted text-center small">Searching...</div>
              ) : (
                <>
                  {results.banks.length > 0 && (
                    <div className="bg-light px-3 py-2 border-bottom">
                      <small className="fw-bold text-muted text-uppercase">Banks</small>
                    </div>
                  )}
                  {results.banks.map((bank, i) => (
                    <Link key={`bank-${i}`} href={`/v4/${bank.BANK_NAME.replaceAll(" ", "-")}`} className="text-decoration-none text-dark">
                      <div className="p-3 border-bottom search-dropdown-item d-flex align-items-center">
                        <BsBank className="me-3 text-primary" size={18} />
                        <span className="fw-semibold">{bank.BANK_NAME.replaceAll("_", " ")}</span>
                      </div>
                    </Link>
                  ))}

                  {results.branches.length > 0 && (
                    <div className="bg-light px-3 py-2 border-bottom">
                      <small className="fw-bold text-muted text-uppercase">Branches & IFSC</small>
                    </div>
                  )}
                  {results.branches.map((branch, i) => (
                    <Link key={`branch-${i}`} href={`/v4/${branch.BANK.replaceAll(" ", "-")}/${branch.BRANCH.replaceAll(" ", "-")}`} className="text-decoration-none text-dark">
                      <div className="p-3 border-bottom search-dropdown-item">
                        <div className="d-flex align-items-center mb-1">
                          <BsBuilding className="me-2 text-info" size={14} />
                          <span className="fw-bold text-primary">{branch.IFSC}</span>
                        </div>
                        <div className="small fw-semibold text-dark">{branch.BRANCH}</div>
                        <div className="small text-muted">{branch.BANK.replaceAll("_", " ")} • {branch.STATE}</div>
                      </div>
                    </Link>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
        
        <p className="text-muted small fw-semibold d-flex align-items-center justify-content-center mb-5 pb-5 mt-3">
          <BsCheckCircle className="me-2" /> Database updated today
        </p>

        <style jsx>{`
          .search-dropdown-item:hover {
            background-color: #f8fafc;
            cursor: pointer;
          }
        `}</style>
      </div>

      <div className="container py-5 border-top">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold" style={{ color: '#0a194f' }}>Quick Find</h4>
          <a href="/banks-v4" className="fw-semibold text-decoration-none" style={{ color: '#0056b3' }}>View All Banks &rarr;</a>
        </div>
        
        <div className="row g-4 mb-5 pb-5 border-bottom">
          <div className="col-12 col-md-3">
            <a href="/v4/State-Bank-of-India" className="text-decoration-none">
              <div className="bank-card">
                <div className="letter-icon letter-s">S</div>
                <h5 className="fw-bold mb-1" style={{ color: '#1e293b' }}>SBI</h5>
                <p className="text-muted small mb-0">State Bank of India</p>
              </div>
            </a>
          </div>
          <div className="col-12 col-md-3">
            <a href="/v4/HDFC-Bank" className="text-decoration-none">
              <div className="bank-card">
                <div className="letter-icon letter-h">H</div>
                <h5 className="fw-bold mb-1" style={{ color: '#1e293b' }}>HDFC</h5>
                <p className="text-muted small mb-0">HDFC Bank Ltd</p>
              </div>
            </a>
          </div>
          <div className="col-12 col-md-3">
            <a href="/v4/ICICI-Bank" className="text-decoration-none">
              <div className="bank-card">
                <div className="letter-icon letter-i">I</div>
                <h5 className="fw-bold mb-1" style={{ color: '#1e293b' }}>ICICI</h5>
                <p className="text-muted small mb-0">ICICI Bank</p>
              </div>
            </a>
          </div>
          <div className="col-12 col-md-3">
            <a href="/v4/Axis-Bank" className="text-decoration-none">
              <div className="bank-card">
                <div className="letter-icon letter-a">A</div>
                <h5 className="fw-bold mb-1" style={{ color: '#1e293b' }}>Axis</h5>
                <p className="text-muted small mb-0">Axis Bank</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="container pb-5 mb-5 text-center">
        <h3 className="fw-bold mb-5" style={{ color: '#0a194f' }}>Why use BankIFSC Code?</h3>
        
        <div className="row g-4">
          <div className="col-12 col-md-4">
            <div className="feature-icon-container">
              <BsLightningFill />
            </div>
            <h5 className="fw-bold mb-2">Instant Speed</h5>
            <p className="text-muted small mx-auto" style={{ maxWidth: '280px' }}>
              Optimized search architecture returns query results in milliseconds, keeping your workflow uninterrupted.
            </p>
          </div>
          <div className="col-12 col-md-4">
            <div className="feature-icon-container">
              <BsUiChecks />
            </div>
            <h5 className="fw-bold mb-2">Verified Accuracy</h5>
            <p className="text-muted small mx-auto" style={{ maxWidth: '280px' }}>
              Data synced directly with RBI master directories ensuring you never process a failed transaction due to an incorrect code.
            </p>
          </div>
          <div className="col-12 col-md-4">
            <div className="feature-icon-container">
              <BsDisplay />
            </div>
            <h5 className="fw-bold mb-2">Minimalist Ease</h5>
            <p className="text-muted small mx-auto" style={{ maxWidth: '280px' }}>
              A distraction-free interface designed solely for rapid information retrieval without intrusive ads or popups.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
