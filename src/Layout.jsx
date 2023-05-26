import React, { useState, useEffect, useRef } from "react";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Projects from "./Components/Projects";
import Contact from "./Components/Contact";
import About from "./Components/CmpAbout";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

export default function Layout() {

  
  return (
    <>
      <Nav />
      <div data-index="0">
        <Header />
        <div className="space"></div>
      </div>

      <div data-index="1">
        <About />
        <div className="space"></div>
      </div>

      <div data-index="2">
        <Projects />
        <div className="space"></div>
      </div>

      <div  data-index="3">
      <Contact />
        <div className="space"></div>
        
      </div>
      
      <Footer />
    </>
  );
}
