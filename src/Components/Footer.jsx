import React from "react";
import { Link } from "react-scroll";

import { image } from "../Files/image";

export default function Footer() {
  const scrollToDiv = () => {
    const targetDiv = document.getElementById("targetDiv");
    if (targetDiv) {
      const offset = -500; // Offset in pixels
      const targetPosition = targetDiv.offsetTop + offset;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="container-fluid bg-dark py-3">
        <div className="container d-flex justify-content-center p-0 text-white">
          <div className="row w-100">
            <div className="col p-0 d-flex mt-auto">
              <div>
              <h4 className="fw-bold">Justin M</h4>
              <a
                className="social-link bottom p-0 me-3"
                href="https://www.linkedin.com/in/justin-masiga-992772236/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="social-link bottom"
                  src={image.linkedin}
                  alt=""
                />
              </a>
              <a
                className="social-link bottom p-0 me-3"
                href="https://github.com/tsujintsujin"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img className="social-link bottom" src={image.git} alt="" />
              </a>
              <a
                className="social-link bottom p-0 me-3"
                href="https://facebook.com/tsujintsujin"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="social-link bottom"
                  src={image.facebook}
                  alt=""
                />
              </a></div>
            </div>
            <div className="col d-flex flex-column text-end m-0 p-0">
              <Link
                to="Home"
                smooth={true}
                onClick={scrollToDiv}
                offset={-200}
                className="nav-link"
                aria-current="page"
                href="#"
              >
                Home
              </Link>
              <Link
                to="About"
                smooth={true}
                onClick={scrollToDiv}
                offset={-250}
                className="nav-link"
                aria-current="page"
                href="#"
              >
                About
              </Link>
              <Link
                to="Projects"
                smooth={true}
                onClick={scrollToDiv}
                offset={-80}
                className="nav-link"
                aria-current="page"
                href="#"
              >
                Projects
              </Link>

              <Link
                to="Certification"
                smooth={true}
                onClick={scrollToDiv}
                offset={-300}
                className="nav-link"
                aria-current="page"
                href="#"
              >
                Certification
              </Link>
              <Link
                to="Contact"
                smooth={true}
                onClick={scrollToDiv}
                offset={-100}
                className="nav-link"
                aria-current="page"
                href="#"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
