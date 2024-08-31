import React from "react";
import "../styles/Register.css";
import { Link } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

const Register = () => {
  return (
    <div className='main-wrapper p-2 pt-5'>
      <div className='wrapper-register'>
        <form action=''>
          <h1>Register</h1>
          <div className='name'>
            <input type='text' placeholder='First Name' />
            <input type='text' placeholder='Last Name' />
          </div>
          <div>
            <input type='email' placeholder='Email Address' />
          </div>
          <div>
            <input type='number' placeholder='Age' min={0} />
          </div>
          <div>
            <input type='text' placeholder='Phone' />
          </div>
          <div>
            <input type='password' placeholder='Password' />
          </div>
          <div>
            <input type='password' placeholder='Confirm Password' />
          </div>
          <button type='submit'>Register</button>
          <div className='register-link'>
            <p>
              Already have an account? <Link to={"/login"}>Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
