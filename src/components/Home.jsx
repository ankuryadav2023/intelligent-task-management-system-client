import React, { useEffect } from 'react';
import { useOrganization, useUser } from '@clerk/clerk-react';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../assets/zaptask-logo.png';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="d-flex justify-content-center align-items-center text-center p-3 mx-auto flex-column homepage-container">
      <div className="d-flex justify-content-center align-items-center mb-5">
          <img src={logo} alt="" className="img-fluid img-thumbnail ml-4"/>
          <h1>ZapTask</h1>
          </div>
          <h2>Elevate Your Workflow with Our Intelligent Task Management System</h2>
          <p className="lead homepage-introduction-para">Welcome to ZapTask, the Intelligent Task Management System designed to streamline your projects and tasks with unparalleled efficiency and smart features.</p>
          <p className="lead">
            <Link to="/features" className="btn learn-more-btn mt-5">Learn More</Link>
          </p>
    </div>
  )
}

export default Home