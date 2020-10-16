import React from 'react';

const Link = ({ className, href, children}) => {
    const onClick = (event) => {
        // true or false to indicate whether or not the user held down their cmd/ctrl key to open a link in a new tab
        if (event.metaKey || event.ctrlKey) {
            return;
        }
        
        event.preventDefault(); // prevent full page reload when navigating to other links
        window.history.pushState({}, '', href);

        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
    };

    return (
        <a 
            onClick={onClick}
            className={className}
            href={href}
        >{children}</a>
    )
};

export default Link;