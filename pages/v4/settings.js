import HeadSeo from '@/comp/HeadSeo';
import { useState, useEffect } from 'react';
import { BsCheckCircleFill, BsGearFill } from 'react-icons/bs';
import Head from 'next/head';

export default function Settings() {
  const [preferredMap, setPreferredMap] = useState('both');
  const [preferredFont, setPreferredFont] = useState('default');

  useEffect(() => {
    const savedMap = localStorage.getItem('preferredMapProvider');
    if (savedMap) {
      setPreferredMap(savedMap);
    }
    const savedFont = localStorage.getItem('preferredFont');
    if (savedFont) {
      setPreferredFont(savedFont);
    }
  }, []);

  const handleSelectMap = (mapType) => {
    setPreferredMap(mapType);
    localStorage.setItem('preferredMapProvider', mapType);
  };

  const handleSelectFont = (fontType) => {
    setPreferredFont(fontType);
    localStorage.setItem('preferredFont', fontType);
  };

  return (
    <>
      <HeadSeo />
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet" />
      </Head>
      <div className="container mt-5 mb-5 pb-5">
        <h2 className="fw-bold mb-4 d-flex align-items-center" style={{ color: '#0a194f' }}>
          <BsGearFill className="me-3" /> Preferences
        </h2>

        {/* Map Preferences */}
        <div className="bg-white border rounded p-4 shadow-sm" style={{ borderColor: '#e2e8f0' }}>
          <h5 className="fw-bold mb-3" style={{ color: '#1e293b' }}>Default Map Provider</h5>
          <p className="text-muted mb-4">Choose which map service you want to see on the branch details page.</p>

          <div className="row g-4">
            {/* Both Option */}
            <div className="col-12 col-md-4">
              <div 
                className={`card h-100 cursor-pointer transition-all ${preferredMap === 'both' ? 'border-primary shadow' : 'border-light'}`}
                style={{ cursor: 'pointer', borderWidth: preferredMap === 'both' ? '2px' : '1px' }}
                onClick={() => handleSelectMap('both')}
              >
                <div className="card-body text-center d-flex flex-column align-items-center justify-content-center py-5 bg-light rounded">
                  <div className="d-flex gap-2 mb-3">
                    <span className="badge bg-secondary">Google</span>
                    <span className="badge bg-secondary">Mappls</span>
                  </div>
                  <h6 className="fw-bold mb-0">Show Both Maps</h6>
                  {preferredMap === 'both' && <BsCheckCircleFill className="text-primary position-absolute top-0 end-0 m-3" size={20} />}
                </div>
              </div>
            </div>

            {/* Google Maps Option */}
            <div className="col-12 col-md-4">
              <div 
                className={`card h-100 cursor-pointer transition-all ${preferredMap === 'google' ? 'border-primary shadow' : 'border-light'}`}
                style={{ cursor: 'pointer', borderWidth: preferredMap === 'google' ? '2px' : '1px' }}
                onClick={() => handleSelectMap('google')}
              >
                <div className="card-body text-center d-flex flex-column align-items-center justify-content-center py-5 rounded" style={{ background: 'linear-gradient(to bottom right, #e2e8f0, #cbd5e1)' }}>
                  <h6 className="fw-bold text-muted mb-0 bg-white px-3 py-1 rounded shadow-sm">VIEW ON GOOGLE MAPS</h6>
                  {preferredMap === 'google' && <BsCheckCircleFill className="text-primary position-absolute top-0 end-0 m-3" size={20} />}
                </div>
              </div>
            </div>

            {/* MapMyIndia Option */}
            <div className="col-12 col-md-4">
              <div 
                className={`card h-100 cursor-pointer transition-all ${preferredMap === 'mappls' ? 'border-primary shadow' : 'border-light'}`}
                style={{ cursor: 'pointer', borderWidth: preferredMap === 'mappls' ? '2px' : '1px' }}
                onClick={() => handleSelectMap('mappls')}
              >
                <div className="card-body text-center d-flex flex-column align-items-center justify-content-center py-5 rounded" style={{ background: 'linear-gradient(to bottom right, #e2e8f0, #cbd5e1)' }}>
                  <h6 className="fw-bold text-muted mb-0 bg-white px-3 py-1 rounded shadow-sm">VIEW ON MAPMYINDIA</h6>
                  {preferredMap === 'mappls' && <BsCheckCircleFill className="text-primary position-absolute top-0 end-0 m-3" size={20} />}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Font Preferences */}
        <div className="bg-white border rounded p-4 shadow-sm mt-4" style={{ borderColor: '#e2e8f0' }}>
          <h5 className="fw-bold mb-3" style={{ color: '#1e293b' }}>IFSC Map Font</h5>
          <p className="text-muted mb-4">Choose the font style for the IFSC Code Map display.</p>

          <div className="row g-4">
            {/* Default Font */}
            <div className="col-12 col-md-4">
              <div 
                className={`card h-100 cursor-pointer transition-all ${preferredFont === 'default' ? 'border-primary shadow' : 'border-light'}`}
                style={{ cursor: 'pointer', borderWidth: preferredFont === 'default' ? '2px' : '1px' }}
                onClick={() => handleSelectFont('default')}
              >
                <div className="card-body text-center d-flex flex-column align-items-center justify-content-center py-4 bg-light rounded" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  <h5 className="mb-2">12345</h5>
                  <h6 className="fw-bold mb-0 text-muted">Default</h6>
                  {preferredFont === 'default' && <BsCheckCircleFill className="text-primary position-absolute top-0 end-0 m-3" size={20} />}
                </div>
              </div>
            </div>

            {/* Didone Room */}
            <div className="col-12 col-md-4">
              <div 
                className={`card h-100 cursor-pointer transition-all ${preferredFont === 'didone' ? 'border-primary shadow' : 'border-light'}`}
                style={{ cursor: 'pointer', borderWidth: preferredFont === 'didone' ? '2px' : '1px' }}
                onClick={() => handleSelectFont('didone')}
              >
                <div className="card-body text-center d-flex flex-column align-items-center justify-content-center py-4 bg-light rounded" style={{ fontFamily: '"Didone Room", serif' }}>
                  <h5 className="mb-2">12345</h5>
                  <h6 className="fw-bold mb-0 text-muted" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>Didone Room</h6>
                  {preferredFont === 'didone' && <BsCheckCircleFill className="text-primary position-absolute top-0 end-0 m-3" size={20} />}
                </div>
              </div>
            </div>

            {/* JetBrains Mono */}
            <div className="col-12 col-md-4">
              <div 
                className={`card h-100 cursor-pointer transition-all ${preferredFont === 'jetbrains' ? 'border-primary shadow' : 'border-light'}`}
                style={{ cursor: 'pointer', borderWidth: preferredFont === 'jetbrains' ? '2px' : '1px' }}
                onClick={() => handleSelectFont('jetbrains')}
              >
                <div className="card-body text-center d-flex flex-column align-items-center justify-content-center py-4 bg-light rounded" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                  <h5 className="mb-2">12345</h5>
                  <h6 className="fw-bold mb-0 text-muted" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>JetBrains Mono</h6>
                  {preferredFont === 'jetbrains' && <BsCheckCircleFill className="text-primary position-absolute top-0 end-0 m-3" size={20} />}
                </div>
              </div>
            </div>

            {/* Archivo */}
            <div className="col-12 col-md-4">
              <div 
                className={`card h-100 cursor-pointer transition-all ${preferredFont === 'archivo' ? 'border-primary shadow' : 'border-light'}`}
                style={{ cursor: 'pointer', borderWidth: preferredFont === 'archivo' ? '2px' : '1px' }}
                onClick={() => handleSelectFont('archivo')}
              >
                <div className="card-body text-center d-flex flex-column align-items-center justify-content-center py-4 bg-light rounded" style={{ fontFamily: '"Archivo", sans-serif' }}>
                  <h5 className="mb-2">12345</h5>
                  <h6 className="fw-bold mb-0 text-muted" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>Archivo</h6>
                  {preferredFont === 'archivo' && <BsCheckCircleFill className="text-primary position-absolute top-0 end-0 m-3" size={20} />}
                </div>
              </div>
            </div>

            {/* Rajdhani */}
            <div className="col-12 col-md-4">
              <div 
                className={`card h-100 cursor-pointer transition-all ${preferredFont === 'rajdhani' ? 'border-primary shadow' : 'border-light'}`}
                style={{ cursor: 'pointer', borderWidth: preferredFont === 'rajdhani' ? '2px' : '1px' }}
                onClick={() => handleSelectFont('rajdhani')}
              >
                <div className="card-body text-center d-flex flex-column align-items-center justify-content-center py-4 bg-light rounded" style={{ fontFamily: '"Rajdhani", sans-serif' }}>
                  <h5 className="mb-2">12345</h5>
                  <h6 className="fw-bold mb-0 text-muted" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>Rajdhani</h6>
                  {preferredFont === 'rajdhani' && <BsCheckCircleFill className="text-primary position-absolute top-0 end-0 m-3" size={20} />}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
