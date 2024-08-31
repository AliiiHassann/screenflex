import React from "react";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className='p-4 text-center position-absolute w-100'>
      <h3 className='text-white h6 opacity-50 m-0'>
        All rights reserved &copy; (Company), 4/2024. Programmed by{" "}
        <a
          className='footer-a'
          href='https://www.linkedin.com/in/ali-hassan-76a0a5249/'
        >
          Ali
        </a>
      </h3>
    </footer>
  );
}

export default Footer;
