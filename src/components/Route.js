import React, { useState, useEffect } from 'react';
// don't need to import React bc we haven't written any JSX

const Route = ({ path, children }) => {
    const [currentPath, setCurrentPath] = useState(window.location.pathname);
    useEffect(() => {
        // why set onLocationChange as a separate variable?
        // if we want to remove this component from the screen, we need a clean up method
        const onLocationChange = () => {
            // console.log("Location Change");
            setCurrentPath(window.location.pathname);
        };

        window.addEventListener('popstate', onLocationChange);

        // cleanup function
        return () => {
            window.removeEventListener('popstate', onLocationChange);
        }
        
    }, []); // only run useEffect hook when component is first rendered to the screen

    return currentPath === path ? children : null;
}

export default Route;