import React, { useEffect } from "react";

import { image } from "../Files/image";
import { useTheme } from '../Components/ThemeContext'; 

export default function CmpAbout() {

  const { isLightMode, lightModeToggle } = useTheme(); 

  useEffect(() => {
    const parallax = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const parallaxElements =
        document.getElementsByClassName("parallax-image");

      for (let i = 0; i < parallaxElements.length; i++) {
        const parallaxElement = parallaxElements[i];
        const parallaxSpeed = 0.2; // Adjust this value to change the parallax effect intensity
        const translateY = scrollTop * parallaxSpeed - 350; // Adjust the -100 value to raise or lower the image position

        parallaxElement.style.transform = `translate3d(0, ${translateY}px, 0)`;
      }
    };

    window.addEventListener("scroll", parallax);
    return () => {
      window.removeEventListener("scroll", parallax);
    };
  }, []);

  return (
    <>
      <div id="About" className="container p-0">
        <div className="row">
          <div className="col-12 col-md-6 position-relative">
            <img
              className={`rotate position-absolute spinning-img  ${isLightMode ? '' : 'image-invert-grayscale'}`}
              src={image.spin}
              alt=""
            />
            <div className="overflow-hidden h-100 position-relative border-rad-15">
              <div className="parallax-container">
                <img className="parallax-image" src={image.about} alt="" />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-content-center">
            <h5 className="fw-bold text-main mt-4 mt-lg-0 px-2 ">Present Endeavor</h5>
            <hr />

            <h4 className={`fw-bold mb-2  px-2 ${isLightMode ? 'text-dark' : ''}`}>
              {" "}
              Full Stack Web Developer.
            </h4>
            <div className={`${isLightMode ? 'text-muted' : ''}`}>
            <h5 className="px-2">
              Currently working as a Business Analysis Developer for Tradynamics
            </h5>
            <h5 className="px-2">
              Focused on Vanilla Frontend with PHP and AWS Quicksight Technology. 
            </h5>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
