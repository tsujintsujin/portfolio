import React, { useState, useEffect } from "react";
import { image } from "../Files/image";
import { useTheme } from '../Components/ThemeContext'; 
import { Link } from "react-scroll";

export default function Nav(props) {
  const { isLightMode, lightModeToggle } = useTheme(); 
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

  useEffect(() => {
    // Change background color based on the mode
    if (isLightMode) {
      document.getElementById('root').style.backgroundColor = 'white'; // Light mode background
    } else {
      document.getElementById('root').style.backgroundColor = '#222222'; // Dark mode background
    }
  }, [isLightMode]); // Runs whenever isLightMode changes

  // Check if the current section is active based on props.focusedDiv
  const checkActive = (name) => {
    if (props.focusedDiv === name) {
      return "active";
    }
    return ""; // If not active, return an empty string
  };

  return (
    <>
    <div className={`container-fluid py-1 nav-shadow-dark sticky-top ${isLightMode ? 'bg-white' : 'bg-dark'}`}>
        <nav className={`navbar navbar-expand-lg container ${isLightMode ? 'bg-white' : 'bg-dark'}`}>
          <div className={`container-fluid  ${isLightMode ? 'bg-white' : 'bg-dark'}`}>
            <a className={`navbar-brand ${isLightMode ? 'text-dark' : 'text-white'}`} href="#">
            <strong>Justin M.</strong>
            </a>
            <div className=""> 
            <div
             className="img-light-bg"
              style={{ display: isLightMode ? 'block' : 'none' }}
            ></div>
                  <img
            className="img-light"
            onClick={lightModeToggle}
            src={isLightMode ? image.lightMode : image.darkMode} // Toggle image based on mode
            alt="Mode Toggle"
          />
            {/* <img
              className="img-light"
              onClick={lightModeToggle}
              src={image.lightMode}
              alt=""
            /> */}
             </div>

            <button
              onClick={ToggleSidebar}
              className={`navbar-toggler ${isLightMode ? 'bg-white' : 'image-invert-grayscale'}`}
              type="button"
              data-bs-toggle="collapse"
              aria-controls="navbarText"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon "></span>
            </button>
            <div className="collapse navbar-collapse " id="navbarText">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    to="Home"
                    smooth={true}
                    onClick={scrollToDiv}
                    offset={-200}
                    className={`nav-link ${isLightMode ? 'text-dark' : 'text-white'} ${checkActive("Home")}`}
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
                    offset={-350}
                    className={`nav-link ${isLightMode ? 'text-dark' : 'text-white'} ${checkActive("About")}`}
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
                    className={`nav-link ${isLightMode ? 'text-dark' : 'text-white'} ${checkActive("Projects")}`}
                    aria-current="page"
                    href="#"
                  >
                    Projects
                  </Link>
                </li>
                <li className="nav-item">
            <Link
              to="Certification"
              smooth={true}
              onClick={scrollToDiv}
              offset={-300}
              className={`nav-link ${isLightMode ? 'text-dark' : 'text-white'} ${checkActive("Certification")}`}
              aria-current="page"
              href="#"
            >
              Certification
            </Link>
          </li>
                <li className="nav-item">
                  <Link
                    to="Contact"
                    smooth={true}
                    onClick={scrollToDiv}
                    offset={-180}
                    className={`nav-link ${isLightMode ? 'text-dark' : 'text-white'} ${checkActive("Contact")}`}
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

      <div className={`popup-nav position-fixed vh-100 w-100 ${isLightMode ? 'bg-white' : 'bg-dark'} text-center pt-5 ${isActive ? "active" : ""}`}>
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
          <li className="nav-item">
            <Link
              to="Home"
              smooth={true}
              onClick={sideNavToggle}
              offset={-200}
              className={`nav-link ${isLightMode ? 'text-dark' : 'text-white'} ${checkActive("Home")}`}
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
              className={`nav-link ${isLightMode ? 'text-dark' : 'text-white'} ${checkActive("About")}`}
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
              className={`nav-link ${isLightMode ? 'text-dark' : 'text-white'} ${checkActive("Projects")}`}
              aria-current="page"
              href="#"
            >
              Projects
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="Certification"
              smooth={true}
              onClick={sideNavToggle}
              offset={-80}
              className={`nav-link ${isLightMode ? 'text-dark' : 'text-white'} ${checkActive("Certification")}`}
              aria-current="page"
              href="#"
            >
              Certification
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="Contact"
              smooth={true}
              onClick={sideNavToggle}
              offset={-50}
              className={`nav-link ${isLightMode ? 'text-dark' : 'text-white'} ${checkActive("Contact")}`}
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
