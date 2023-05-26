import React from "react";
import { image } from "../Files/image";

export default function Header() {
  return (
    <>
      <div id="Home" className="container py-5 mt-5">
        <div className="d-flex flex-reverse-md row">
          <div
            id="left"
            className="col-12 col-lg-7 d-flex text-center text-lg-start"
          >
            <div className="row">
              <div className="col ">
                <div className="">
                  <h1 className="fw-bold">Full Stack Web Developer</h1>
                  <h5 className="text-muted my-4 pe-5">
                    Hi, I'm Justin. A passionate Full Stack Web Developer based
                    in Mindanao, Philippines.
                  </h5>
                  <div className="row p-0 m-0 justify-content-center justify-content-lg-start">
                    <a
                      className="social-link p-0 me-3"
                      href="https://www.linkedin.com/in/justin-masiga-992772236/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        className="social-link"
                        src={image.linkedin}
                        alt=""
                      />
                    </a>
                    <a
                      className="social-link p-0 me-3"
                      href="https://github.com/tsujintsujin"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img className="social-link" src={image.git} alt="" />
                    </a>
                    <a
                      className="social-link p-0 me-3"
                      href="https://facebook.com/tsujiiin"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        className="social-link"
                        src={image.facebook}
                        alt=""
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            id="right"
            className="col-12 col-lg-5 d-flex justify-content-end-lg justify-content-center align-items-center"
          >
            <div className="profile-image-container">
              <img className="profile-image" src={image.justin} alt="" />
            </div>
          </div>
        </div>
        <h5 className="fw-bold pt-5 m-0 mb-3 text-center text-lg-start">Tech Stack: </h5>
        <div className=" p-0 m-0 d-flex flex-wrap gap-3 grid">
          <div className="tech-stack-container">
            <img
              className="tech-stack"
              src={image.html}
              alt="HTML"
              title="HTML 5"
            />{" "}
          </div>
          <div className="tech-stack-container ">
            <img className="tech-stack" src={image.css3} alt=""  title="CSS 3"/>
          </div>
          <div className="tech-stack-container">
            <img className="tech-stack" src={image.javascript} alt=""  title="Javascript"/>
          </div>
          <div className="tech-stack-container">
            <img className="tech-stack" src={image.bs} alt="" title="Bootstrap" />
          </div>
          <div className="tech-stack-container">
            <img className="tech-stack" src={image.react} alt=""  title="React"/>
          </div>
          <div className="tech-stack-container">
            <img className="tech-stack" src={image.php} alt=""  title="PHP"/>
          </div>
          <div className="tech-stack-container">
            <img className="tech-stack" src={image.mysql} alt=""  title="MySQL" />
          </div>
          <div className="tech-stack-container">
            <img className="tech-stack" src={image.laravel} alt="" title="Laravel" />
          </div>

          
        </div>
      </div>
    </>
  );
}
