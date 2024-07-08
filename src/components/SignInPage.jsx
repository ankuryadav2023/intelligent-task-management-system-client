import { useEffect } from "react";
import { SignIn, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function SignInPage() {
    const { isSignedIn, isLoaded } = useUser();
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

    return (
        <div className="d-flex justify-content-center align-items-center my-spinner-container">
            <div className="spinner-border my-spinner" role="status">
            </div>
            <span className="ms-3 fs-3">Redirecting...</span>
        </div>
    );
}
