import React from "react";
import { image } from "../Files/image";

export default function about() {
  return (
    <>
      <div id="About" className="container">
        <div className="row">
          <div className="col-12 col-md-6 position-relative">
          <img className="rotate position-absolute spinning-img" src={image.spin} alt="" />
            <div className="overflow-hidden h-100 position-relative border-rad-15">
              <img className="h-100" src={image.desk} alt="" />
            </div>
          </div>
          <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-content-center">
            <h5 className="fw-bold text-main mt-4 mt-lg-0">About Me</h5>
            <hr />

            <h4 className="fw-bold mb-2 text-muted ">
              {" "}
              A dedicated Full Stack Web Developer.
            </h4>
            <h5 className="">
              I am a skilled Full Web Stack Developer with a diverse set of
              talents in HTML, CSS, JavaScript, and React. My proficiency lies
              in creating and managing responsive websites that deliver a
              seamless user experience. I have a strong aptitude for designing
              interactive interfaces by employing efficient and well-structured
              code, while leveraging the latest development tools and
              methodologies. Additionally, I possess expertise in utilizing
              Adobe software, including Illustrator, Photoshop, and After
              Effects, for designing purposes.
            </h5>
          </div>
        </div>
      </div>
    </>
  );
}
