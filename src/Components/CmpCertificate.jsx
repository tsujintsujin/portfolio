import React, { useEffect } from "react";

import { image } from "../Files/image";

export default function CmpCertificate() {
  
  return (
    <>
      <div id="Certification" className="container p-0">
        <div className="row">
          <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-content-center">
            <h5 className="fw-bold text-main mt-4 mt-lg-0 px-2  border-3 borsd">Certification</h5>
            <hr className=""/>

            <h4 className="fw-bold mb-2 text-muted  px-2">
              {" "}
              Kodego Full Stack Web Developer
            </h4>
            <h6 className="mb-2 text-muted  px-2">Batch Top Student</h6>
            <h5 className="px-2">
             
            </h5>
          </div>
          <div className="col-12 col-md-6 position-relative">
            <div className="overflow-hidden h-100 position-relative border-rad-15">
              <div className="parallax-container ">
                <img className="img-fluid" src={image.cert} alt="" />
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
}
