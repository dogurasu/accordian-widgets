import React, { useState } from 'react';

const Accordion = ( {items} ) => {

    // basically like this:
    // const things = useState(null);
    // const activeIndex = things[0];
    // const setActiveIndex = things[1];

    // get state
    // first arg: piece of state we're keeping track of
    // second arg: our function to update that state
    const [activeIndex, setActiveIndex] = useState(null);
    
    const onTitleClick = (index) => {
        // update state - causes component to re-render
        setActiveIndex(index);
    }

    const renderedItems = items.map((item, index) => {
        // determines whether our component should be considered "active"
        const active = index === activeIndex ? 'active' : '';

        return (
            <React.Fragment key={item.title}>
                <div
                    className={`title ${active}`}
                    onClick={() => onTitleClick(index)}
                >
                    <i className="dropdown icon"></i>
                    {item.title}
                </div>
                <div className={`content ${active}`}>
                    <p>{item.content}</p>
                </div>
            </React.Fragment>
        );
    });
    
    return (
        <div className="ui styled accordion">
            {renderedItems}
            {/* Get state */}
            {/* <h1>{activeIndex}</h1> */}
        </div>
    )
}

export default Accordion;