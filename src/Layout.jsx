import React from "react";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Projects from "./Components/Projects";
import Contact from "./Components/Contact";
import About from "./Components/about";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';


export default function Layout() {
  return (
    <>
<Nav />
<Header />
<div className="space"></div>

<About />
<div className="space"></div>

<Projects />
<div className="space"></div>

<Contact />
<div className="space"></div>

<Footer />

    </>
  );
}
