import React, { useState, useEffect, useRef } from 'react';

// ref allows you to see if one element is w/in another

const Dropdown = ({ options, label, selected, onSelectedChange }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef();

    // to close dropdown menu when something is clicked
    useEffect(() => {
        const onBodyClick = (event) => {
            // console.log("Body Clicked!");
            // console.log(event.target);
            // console.log(ref.current);
            // will see if the element we clicked on is inside of our component
            //      - if it is, we can return early
            // otherwise, it wasn't open inside the comopnent
            //      - we will set open to 'false' to close the dropdown
            if (ref.current.contains(event.target)) {
                return;
            }
            // close the dropdown
            setOpen(false);
        };

        document.body.addEventListener('click', onBodyClick);

        // cleanup function gets invoked right before the Dropdown gets taken down
        return () => {
            document.body.removeEventListener('click', onBodyClick);
        };
    }, []); // empty array to make sure this hook runs only once

    const renderedOptions = options.map((option) => {
        // check if the option is currently selected
        if (option.value === selected.value) {
            return null;
        }
        return (
            <div 
                className="item"
                key={option.value}
                onClick={() => {
                    // console.log("Item Clicked!");
                    onSelectedChange(option)
                }}
            >
                {option.label}
            </div>
        )
    })

    return (
        <div 
            ref={ref}
            className="ui form"
        >
            <div className="field">
                <label className="label">{label}</label>
                <div 
                    onClick={() => {
                        // console.log("Dropdown Clicked!");
                        setOpen(!open);
                    }}
                    className={`ui selection dropdown ${open ? 'visible active' : ''}`}
                >
                    <i className="dropdown icon"></i>
                    <div className="text">{selected.label}</div>
                    <div className={`menu ${open ? 'visible transition' : ''}`}>
                        {renderedOptions}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dropdown