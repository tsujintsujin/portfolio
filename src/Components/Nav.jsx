import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
export default function Nav(props) {
  const [isActive, setIsActive] = useState(false);
  const ToggleSidebar = () => {
    setIsActive(!isActive);
  };

  const sideNavToggle = () => {
    ToggleSidebar();
    scrollToDiv();
  };

  
  const scrollToDiv = () => {
    const targetDiv = document.getElementById("targetDiv");
    if (targetDiv) {

      const offset = -200; // Offset in pixels
      const targetPosition = targetDiv.offsetTop + offset;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
  };

  useEffect(() => {}, [props.focusedDiv]); //

  const checkActive = (name) => {
    if (props.focusedDiv === name) {
      return "active";
    } else {
    }
  };

  return (
    <>
      <div className="container-fluid bg-white py-1 nav-shadow sticky-top">
        <nav className="navbar navbar-expand-lg bg-body-tertiary  container  ">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              {" "}
              <strong>Justin M.</strong>
            </a>
            <button
              onClick={ToggleSidebar}
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              aria-controls="navbarText"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    to="Home"
                    smooth={true}
                    onClick={scrollToDiv}
                    offset={-200}
                    className={`nav-link ${checkActive("Home")}`}
                    aria-current="page"
                    href="#"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="About"
                    smooth={true}
                    onClick={scrollToDiv}
                    offset={-250}
                    className={`nav-link ${checkActive("About")}`}
                    aria-current="page"
                    href="#"
                  >
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="Projects"
                    smooth={true}
                    onClick={scrollToDiv}
                    offset={-80}
                    className={`nav-link ${checkActive("Projects")}`}
                    aria-current="page"
                    href="#"
                  >
                    Projects
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="Contact"
                    smooth={true}
                    onClick={scrollToDiv}
                    offset={-100}
                    className={`nav-link ${checkActive("Contact")}`}
                    aria-current="page"
                    href="#"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <div className={`popup-nav position-fixed vh-100 w-100 bg-white text-center pt-5 ${isActive ? "active" : ""}`}>
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
          <li className="nav-item">
            <Link
              to="Home"
              smooth={true}
              onClick={sideNavToggle}
              offset={-200}
              className={`nav-link ${checkActive("Home")}`}
              aria-current="page"
              href="#"
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="About"
              smooth={true}
              onClick={sideNavToggle}
              offset={-60}
              className={`nav-link ${checkActive("About")}`}
              aria-current="page"
              href="#"
            >
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="Projects"
              smooth={true}
              onClick={sideNavToggle}
              offset={-80}
              className={`nav-link ${checkActive("Projects")}`}
              aria-current="page"
              href="#"
            >
              Projects
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="Contact"
              smooth={true}
              onClick={sideNavToggle}
              offset={-50}
              className={`nav-link ${checkActive("Contact")}`}
              aria-current="page"
              href="#"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
