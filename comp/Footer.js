function Footer() {
  return (
      <footer className="container py-3 my-4">
        <ul className="nav justify-content-center border-bottom pb-2 mb-2">
          <li className="nav-item"><a href="/" className="nav-link px-2 text-muted">Home</a></li>
          {/* <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Features</a></li>
      <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Pricing</a></li> */}
          <li className="nav-item"><a href="/faq" className="nav-link px-2 text-muted">FAQ's</a></li>
          <li className="nav-item"><a href="/about" className="nav-link px-2 text-muted">About</a></li>
        </ul>
        <p className="text-center footer22 text-muted">* The Data is consolidated from RBI's DataBase Provided on Offical site of RBI</p>
        <p className="text-center text-muted">© 2023 BankIFSC-Code(QPkendra)</p>
      </footer>
  );
}

export default Footer;