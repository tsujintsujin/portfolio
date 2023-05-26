import React from "react";
import { Link } from 'react-scroll'; 
export default function Nav() {
  
  const scrollToDiv = () => {
    const targetDiv = document.getElementById('targetDiv');
    if (targetDiv) {
      const offset = -500; // Offset in pixels
      const targetPosition = targetDiv.offsetTop + offset;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  };
  
  return (
    <>
<div className="container-fluid bg-white py-1 nav-shadow sticky-top">
<nav className="navbar navbar-expand-lg bg-body-tertiary  container  ">
  <div className="container-fluid">
  <a className="navbar-brand" href="#">  <strong>Justin M.</strong></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarText">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link to="Home" smooth={true} onClick={scrollToDiv} offset={-200} className="nav-link active" aria-current="page" href="#">Home</Link>
        </li>
        <li className="nav-item">
        <Link to="About" smooth={true} onClick={scrollToDiv} offset={-250} className="nav-link" aria-current="page" href="#">About</Link>
        </li>
        <li className="nav-item">
        <Link to="Projects" smooth={true} onClick={scrollToDiv} offset={-80} className="nav-link" aria-current="page" href="#">Projects</Link>
        </li>
        <li className="nav-item">
        <Link to="Contact" smooth={true} onClick={scrollToDiv} offset={-100} className="nav-link" aria-current="page" href="#">Contact</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
</div>
    </>
  );
}
