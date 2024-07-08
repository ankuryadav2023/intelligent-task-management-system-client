import { useUser, CreateOrganization } from "@clerk/clerk-react";
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function CreateOrganizationPage() {
    const { isLoaded, isSignedIn, user } = useUser();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (isLoaded) {
            if (!isSignedIn) {
                location.href = 'https://sunny-bass-40.accounts.dev/sign-in';
            }
        }
    })

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
        <div className="d-flex justify-content-center align-items-center my-4">
            <CreateOrganization afterCreateOrganizationUrl="/dashboard"/>
        </div>
    );
}