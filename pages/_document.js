import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'
import Header from '@/comp/header'
import Footer from '@/comp/Footer'
export default function Document() {
  return (
    <Html lang="en-us">
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <link rel="icon" type="image/png" href="/assets/favicon.png" />
      {/* <meta name="robots" content="index, follow" /> */}
      <link http-equiv="Content-Security-Policy" href="https://fonts.googleapis.com/css2?family=Mitr:wght@200&family=Rajdhani&family=DM+Sans&display=swap" rel="stylesheet" />
      {/* <link href="/assets/aos/aos.css" rel="stylesheet" />
      <script src="/assets/aos/aos.js"  crossorigin="anonymous"></script> */}
      {/* <link href="/assets/bootstrap-icons.css" rel="stylesheet" /> */}
      {/* <script src="/assets/bootstrap-icons.js"  crossorigin="anonymous"></script> */}
      <Script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" http-equiv="Content-Security-Policy" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></Script>
      <Script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" http-equiv="Content-Security-Policy" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></Script>
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" http-equiv="Content-Security-Policy"   integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></Script>
      <Head />
      <body>
        <Header />
        <Main />
        <Footer />
        <NextScript />
      </body>
    </Html>
  )
}
