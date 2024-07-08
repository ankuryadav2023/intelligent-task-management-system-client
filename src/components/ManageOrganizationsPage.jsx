import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useUser, CreateOrganization, OrganizationProfile, OrganizationList, OrganizationSwitcher, useOrganization } from "@clerk/clerk-react";
import { Link, useNavigate } from 'react-router-dom';

const ManageOrganizationsPage = () => {
    const [organizations, setOrganizations] = useState([]);
    const { isLoaded, isSignedIn, user } = useUser();
    const { organization } = useOrganization();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoaded) {
            if (!isSignedIn) {
                location.href = 'https://sunny-bass-40.accounts.dev/sign-in';
            }
        }
    }, [isSignedIn, isLoaded, navigate]);

    useEffect(() => {
        if (user) {
            setOrganizations(user.organizationMemberships);
        }
    }, [user])

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
        <div className="container my-4">
            <div className="row">
                <div className="col-md-4">
                    <OrganizationList />
                </div>
                <div className="col-md-8">
                    {organization ? <OrganizationProfile /> : <></>}
                </div>
            </div>
        </div>
    )
}

export default ManageOrganizationsPage;