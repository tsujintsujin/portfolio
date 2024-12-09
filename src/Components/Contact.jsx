import React, { useRef, useState } from "react";
import { image } from "../Files/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from '../Components/ThemeContext'; 
import emailjs from "@emailjs/browser";

export default function Contact() {
  const { isLightMode, lightModeToggle } = useTheme(); 

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const form = useRef();

 
  const clearInputs = () => {
    setName("");
    setEmail("");
    setMessage("");
  };

  const sendEmail = (e) => {
    const inputEmail = document.getElementById("inputEmail");
    const emailValue = inputEmail.value.trim();
    if (!emailValue.includes("@")) {
      return;
    }
    e.preventDefault();
    toast.promise(
      new Promise((resolve, reject) => {
        setTimeout(() => {
          emailjs
            .sendForm(
              "service_l4oseda",
              "template_m54ticp",
              form.current,
              "ZN6xDMUDrSwb1Ogk9"
            )
            .then(
              (result) => {
                resolve();
                console.log(result.text);
                clearInputs();
              },
              (error) => {
                reject(error);
                console.log(error.text);
              }
            );
        }, 2000);
      }),
      {
        pending: "Sending message...",
        success: "Message sent successfully!",
        error: "Failed to send message. Please try again later.",
      },
      {
        autoClose: 5000,
      }
    );
  };

  return (
    <>
      <div id="Contact" className="container p-3">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-6 p-0">
            <form ref={form} onSubmit={sendEmail} className="">
              <h5 className="fw-bold text-main">Want to build your website?</h5>
              <p className="">
                <strong className={`fs-3 ${isLightMode ? 'text-muted' : 'text-white'}`}>
                  {" "}
                  Let's Connect.
                </strong>
              </p>
              <div className="form-group">
                <label className={`ps-2 ${isLightMode ? 'text-muted' : 'text-white'}`}>Your Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputName"
                  name="from_name"
                  placeholder="e.g. Justin M"
                  value={name}
                  onChange={handleNameChange}
                  required
                />
              </div>
              <div className="form-group mt-4">
                <label className={`ps-2 ${isLightMode ? 'text-muted' : 'text-white'}`}>Your Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail"
                  name="from_email"
                  placeholder="e.g. justin.masiga.94@gmail.com"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
                <small id="emailHelp" className="ps-2 form-text text-white">
                  No worries, I won't share your email to anyone.
                </small>
              </div>
              <div className="form-group mt-4">
                <label className={`ps-2 ${isLightMode ? 'text-muted' : 'text-white'}`}>Message</label>
                <textarea
                  className="form-control"
                  name="message"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Got something for me?"
                  value={message}
                  onChange={handleMessageChange}
                  required
                ></textarea>
              </div>
              <div className="row pb-2 justify-content-center p-0 m-0">
                <button
                  type="submit"
                  value="Send"
                  className={`col mt-4 btn  ${isLightMode ? 'btn-dark' : 'btn-white'} col`}
                >
                  Send
                </button>
              </div>
            </form>
          </div>
          <div className="col-12 col-lg-6 position-relative p-0 m-0 overflow-hidden">
            <div className="h-100 text-end d-flex flex-column  justify-content-end align-items-end">
              <h1 className="name-brand fw-bold no-wrap mt-5 mt-lg-0 text-main ">
                JUSTIN M
              </h1>

              <h6 className={`${isLightMode ? 'text-muted' : 'text-white'}`}>
                <FontAwesomeIcon icon={faEnvelope} className={`pe-2 ${isLightMode ? '' : 'text-white'}`} />
                justin.masiga.94@gmail.com
              </h6>

              <img
              className={`rotate position-absolute spinning-img-contact  ${isLightMode ? '' : 'image-invert-grayscale'}`}
                
                src={image.spin}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </>
  );
}
