import React, { useState, useEffect, useRef } from 'react';

const AuthPage: React.FC = () => {
    const [user, setUser] = useState(null);
    const isMounted = useRef(true);

    useEffect(() => {
        // This effect will run once when the component mounts
        // and also whenever the user state changes

        // Example: Fetch user data from an API
        fetch('/api/user')
            .then(response => response.json())
            .then(data => {
                if (isMounted.current) {
                    setUser(data);
                }
            })
            .catch(error => console.error(error));

        // Cleanup function to prevent state updates on unmounted component
        return () => {
            isMounted.current = false;
        };
    }, []);

    return (
        <div>
            {/* Your component JSX here */}
            {user ? (
                <p>Welcome, {(user as { name: string }).name}!</p>
            ) : (
                <p>Please log in to continue.</p>
            )}
        </div>
    );
};

export default AuthPage;