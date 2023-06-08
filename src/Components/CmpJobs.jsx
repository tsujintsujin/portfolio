import React, { useEffect } from "react";

import { image } from "../Files/image";

export default function Cmpjobs() {


    useEffect(() => {
        const parallax = () => {
          const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;
          const parallaxElements =
            document.getElementsByClassName("parallax-image-jobs");

            const par1 = document.getElementById('par1');


            const speeds = [0.5, 0.25, 0.5];
            const positions = [1250, 650, 1520];
          for (let i = 0; i < parallaxElements.length; i++) {
            const parallaxElement = parallaxElements[i];
            const parallaxSpeed = speeds[i]; // Adjust this value to change the parallax effect intensity
            const parallaxPosition = positions[i];
            const translateY = scrollTop * parallaxSpeed - parallaxPosition; // Adjust the -100 value to raise or lower the image position
            parallaxElement.style.transform = `translate3d(0, ${translateY}px, 0)`;
            console.log(translateY);

            if(translateY >=-359 && translateY <=-250 ){
                par1.classList.add("show")
            }else{
                par1.classList.remove("show")

            }
          }


        };
    
        window.addEventListener("scroll", parallax);
        return () => {
          window.removeEventListener("scroll", parallax);
        };
      }, []);


    // useEffect(() => {
    //     const handleScroll = () => {
    //       const scrollPosition = window.pageYOffset;
    
    //       // Parallax effect for first image with speed factor 0.5
    //       const parallaxElement1 = document.getElementById('par1');
    //       parallaxElement1.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    
    //       // Parallax effect for second image with speed factor 0.8
    //       const parallaxElement2 = document.getElementById('par2');
    //       parallaxElement2.style.backgroundPositionY = `${scrollPosition * 2.4}px`;
    
    //       // Parallax effect for third image with speed factor 1.2
     
    //     };
    
    //     window.addEventListener('scroll', handleScroll);
    
    //     return () => {
    //       window.removeEventListener('scroll', handleScroll);
    //     };
    //   }, []);

  return (
    <>
      <div id="Jobs" className="container ">
      <h5 className="fw-bold text-main  px-2">Work History</h5>

      <div className="row vh-100 overflow-hidden">
      <div className="parallax-container rounded-0">
                <img id="par1" className="parallax-image-jobs 1" src={image.Par1} alt="" />
                {/* <img id="par2" className="parallax-image-jobs 2" src={image.Par2} alt="" />
                <img id="par3" className="parallax-image-jobs 2" src={image.Par3} alt="" /> */}
              </div>
    </div>
      </div>
    </>
  );
}
