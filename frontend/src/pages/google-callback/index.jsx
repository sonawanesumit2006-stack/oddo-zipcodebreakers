import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const GoogleCallback = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const token = searchParams.get('token');

        if (token) {
            console.log("Google Login Successful. Token received.");
            localStorage.setItem('access_token', token);
            localStorage.setItem('isAuthenticated', 'true');
            // For now, we don't have the user object in the URL, so we might need to fetch it separately
            // or rely on the backend to provide an endpoint like /me
            // But for basic access, the token is enough.

            navigate('/dashboard');
        } else {
            console.error("No token received from Google Login");
            navigate('/login');
        }
    }, [searchParams, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-xl font-semibold">Completing Login...</div>
        </div>
    );
};

export default GoogleCallback;
