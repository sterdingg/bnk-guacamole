import 'bootstrap/dist/css/bootstrap.css';
import { useEffect } from 'react';
import '../styles/globals.css';
import Script from 'next/script';


export default function App({ Component, pageProps }) {
  useEffect(()=>{
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  },[])
  return(
    <>
      {/* <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX" />
      <Script
        id='google-analytics'
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-XXXXXXX', {
                  page_path: window.location.pathname,
                });
                `,
        }}
      /> */}
    <Component {...pageProps} />
    </>
  )
}
