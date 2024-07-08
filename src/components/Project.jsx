import React, { useState, useEffect } from 'react';
import { useUser, useOrganization } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Project = () => {
    const { isLoaded, isSignedIn, user } = useUser();
    const { organization } = useOrganization();
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        if (isLoaded) {
            if (!isSignedIn) {
                location.href = 'https://sunny-bass-40.accounts.dev/sign-in';
            }
        }
    }, [isSignedIn, isLoaded, navigate]);
    async function fetchProjectDetails() {
        axios.get(import.meta.env.VITE_BACKEND_API_ROUTE + 'get-project/?organizationID=' + organization.id)
            .then(data => {
                setProjects(data.data.projects);
            }).catch(error => {
                console.log(error);
                alert('Sorry! Some Error Occured. Please Refresh the Page.');
            })
    }
    useEffect(() => {
        if (user && organization) {
            fetchProjects();
        }
    }, [user, organization])

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
    <div>Project</div>
  )
}

export default Project