import { useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn) {
        navigate('/dashboard');
      } else {
        location.href = 'https://sunny-bass-40.accounts.dev/sign-in';
      }
    }
  }, [isSignedIn, isLoaded, navigate]);
  if (!user) {
    return (
      <div className="d-flex justify-content-center align-items-center my-spinner-container">
        <div className="spinner-border my-spinner" role="status">
        </div>
        <span className="ms-3 fs-3">Please Wait...</span>
      </div>
    );
  }
  return (
    <div className='container mt-5'>
      <div className="row justify-content-center">
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Create an Organization</h5>
              <p className="card-text">Establish a new organization to manage tasks and collaborate with your team efficiently.</p>
              <Link to="/create-organization" className="btn btn-primary work-btn">Create Organization</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Manage Your Organizations</h5>
              <p className="card-text">Oversee and administer all your organizations, ensuring smooth operations and coordination.</p>
              <Link to="/manage-organizations" className="btn btn-primary work-btn">Manage Organizations</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Create a Project</h5>
              <p className="card-text">Initiate a new project to organize and manage related tasks and team efforts.</p>
              <Link to="/create-project" className="btn btn-primary work-btn">New Project</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Manage Your Projects</h5>
              <p className="card-text">Oversee project progress, update details, and ensure all tasks are aligned with goals.</p>
              <Link to="/manage-projects" className="btn btn-primary work-btn">Your Projects</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Create a Task</h5>
              <p className="card-text">Add a new task to your organization's project and track its progress.</p>
              <Link to="/create-task" className="btn btn-primary work-btn">New Task</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard