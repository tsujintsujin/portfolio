import React from "react";
import { image } from "../Files/image";
import { TypeAnimation } from "react-type-animation";

export default function Projects() {
  return (
    <>
      <div id="Projects" className="h-100 container px-0 ">
        <h5 className="fw-bold text-main  px-2">Projects</h5>
        <h4 className="fw-bold text-muted mb-5  px-2 ">
          <span className="">
            Each project is made with <br className="sm-exist" />
          </span>
          <TypeAnimation
            sequence={[
              3000,
              "passion", // Types 'One'
              3000, // Waits 1s
              "care", // Deletes 'One' and types 'Two'
              3000, // Waits 2s
              "attention",
              3000, // Types 'Three' without deleting 'Two'
              () => {
                console.log("Sequence completed"); // Place optional callbacks anywhere in the array
              },
            ]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
            style={{ fontSize: "1.5rem", display: "inline-block" }}
          />
        </h4>

        <div className="container-fluid p-0 ">
          <div className="container-fluid  shadow-card  border-rad-15 mb-5 ">
            <div className="row p-lg-5 border-rad-15 ">
              <div className="col-lg-7 p-0">
                <div className="mt-3 mx-3 mt-lg-0  project-container  border-rad-15 overflow-hidden">
                  <a
                    href="https://mkdphtest.vercel.app/MindanaoKokusaiDaigaku"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img className="project-image" src={image.mkdph} alt="" />
                  </a>
                </div>
              </div>
              <div className="col-lg-5 px-lg-5 py-lg-4 mt-4 ">
                <div className="div w-100">
                  <h4 className="fw-bold text-center">
                    Mindanao Kokusai Daigaku
                  </h4>
                  <h5 className="text-center">
                    Front end information website with a modern design for a
                    College Japanese School in the Philippines.
                  </h5>
                  <h6 className="text-center text-muted">
                  </h6>
                  <div className="d-flex d-flex mt-5 justify-content-evenly">
                    <h6 className="">
                      <span className="py-2 px-3 m-2 bg-white shadow-card border-rad-15 no-wrap">
                        React
                      </span>
                      <span className="py-2 px-3 m-2 bg-white shadow-card border-rad-15 no-wrap">
                        Vanila CSS
                      </span>
                    </h6>
                  </div>
                  <div className="d-flex my-3 mt-lg-5 justify-content-center">
                    <span>
                      <a
                        className="social-link p-0  text-decoration-none"
                        href="https://mkdphtest.vercel.app/MindanaoKokusaiDaigaku"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <strong className="pe-2">Demo</strong>

                        <img className="social-link" src={image.demo} alt="" />
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid  shadow-card  border-rad-15 mb-5 ">
            <div className="row p-lg-5 border-rad-15 d-flex flex-column-reverse flex-lg-row">
              <div className="col-lg-5 px-5 py-4">
                <div className="div w-100 h-100  ">
                  <h4 className="fw-bold text-center">Wedii</h4>
                  <h5 className="text-center">
                    A simple personal website, functioning as an alternative to
                    physical invitations.
                  </h5>
                  <h6 className="text-center text-muted">
                    (Developed during training)
                  </h6>
                  <div className="d-flex mt-5 justify-content-center">
                    <h6 className="">
                      <span className="py-2 px-3 m-2 bg-white shadow-card border-rad-15 no-wrap">
                        HTML
                      </span>
                      <span className="py-2 px-3 m-2 bg-white shadow-card border-rad-15 no-wrap">
                        Vanila CSS
                      </span>
                    </h6>
                  </div>
                  <div className="d-flex mt-5 justify-content-center">
                    <span className="">
                      <a
                        className="social-link p-0 me-4 text-decoration-none"
                        href="https://github.com/tsujintsujin/justinandjecery"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <strong className="pe-2">Git</strong>
                        <img className="social-link" src={image.git} alt="" />
                      </a>
                    </span>
                    <div className="">
                      <a
                        className="social-link p-0   text-decoration-none"
                        href="https://justinandjecery.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <strong className="pe-2">Demo</strong>
                        <img className="social-link" src={image.demo} alt="" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-7 p-0">
                <div className="mt-3 mx-3 mt-lg-0  project-container bg-dark border-rad-15 overflow-hidden">
                  <a
                    href="https://justinandjecery.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img className="project-image" src={image.weddii} alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid  shadow-card  border-rad-15 mb-5 ">
            <div className="row p-lg-5 border-rad-15">
              <div className="col-lg-7 p-0">
                <div className="mt-3 mx-3 mt-lg-0  project-container bg-dark border-rad-15 overflow-hidden">
                  <a
                    href="https://chodae-seven.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img className="project-image" src={image.chodae} alt="" />
                  </a>
                </div>
              </div>
              <div className="col-lg-5 px-5 py-4">
                <div className="div w-100 h-100  ">
                  <h4 className="fw-bold text-center">Chodae</h4>
                  <h5 className="text-center">
                    Map explorer, bucketlist and expenses tracker for future
                    travels.
                  </h5>
                  <h6 className="text-center text-muted">
                    (Disabled Google API)
                  </h6>
                  <div className="d-flex mt-5 justify-content-center">
                    <h6 className="">
                      <span className="py-2 px-3 m-2 bg-white shadow-card border-rad-15 no-wrap">
                        Vanila CSS
                      </span>
                      <span className="py-2 px-3 m-2 bg-white shadow-card border-rad-15 no-wrap">
                        Google Maps API
                      </span>
                    </h6>
                  </div>
                  <div className="d-flex mt-5 justify-content-center">
                    <span>
                      <a
                        className="social-link p-0 me-4 text-decoration-none"
                        href="https://github.com/tsujintsujin/chodae"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <strong className="pe-2">Git</strong>
                        <img className="social-link" src={image.git} alt="" />
                      </a>
                    </span>
                    <span>
                      <a
                        className="social-link p-0  text-decoration-none"
                        href="https://chodae-seven.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <strong className="pe-2">Demo</strong>
                        <img className="social-link" src={image.demo} alt="" />
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
