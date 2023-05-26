import React, { useEffect } from "react";

import { image } from "../Files/image";

export default function About() {
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
              className="rotate position-absolute spinning-img  "
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
            <h5 className="fw-bold text-main mt-4 mt-lg-0 px-2 ">About Me</h5>
            <hr />

            <h4 className="fw-bold mb-2 text-muted  px-2 ">
              {" "}
              A dedicated Full Stack Web Developer.
            </h4>
            <h5 className="px-2">
              I am an passionate Full Stack Web Developer specializing in HTML,
              CSS, JavaScript, and React. I excel in creating responsive
              websites with smooth user experiences. My skills include designing
              interactive interfaces using efficient code and staying up-to-date
              with the latest development tools. I am also proficient in Adobe
              software such as Illustrator, Photoshop, and After Effects for
              design purposes.
            </h5>
          </div>
        </div>
      </div>
    </>
  );
}
