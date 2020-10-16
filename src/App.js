import React, { useState } from 'react';
import Accordion from './components/Accordion';
import Search from './components/Search';
import Dropdown from './components/Dropdown';
import Translate from './components/Translate';
import Route from './components/Route';
import Header from './components/Header';

const items = [
    {
        title: 'What is React?',
        content: 'React is a front-end Javascript framework.'
    },
    {
        title: 'Why use React?',
        content: 'React is a fan favorite JS library among engineers.'
    },
    {
        title: 'How do you use React?',
        content: 'You use React by creating components.'
    }
];

const options = [
    {
        label: 'The Color Red',
        value: 'red'
    },
    {
        label: "The Color Green",
        value: "green"
    },
    {
        label: "A Shade of Blue",
        value: "blue"
    }
];

const showAccordion = () => {
    if (window.location.pathname === '/') {
        return <Accordion items={items}/>;
    }
}

const showList = () => {
    if (window.location.pathname === '/search') {
        return <Search />;
    }
}

const showDropdown = () => {
    if (window.location.pathname === '/dropdown') {
        return <Dropdown />
    }
}

const showTranslate = () => {
    if (window.location.pathname === '/translate') {
        return <Translate />
    }
}

const showComponent = (route, component) => {
    return window.location.pathname === route
        ? component
        : null;
}

export default() => {
    const [selected, setSelected] = useState(options[0]);
    const [showDropdown, setShowDropdown] = useState(true);

    return (
        <div className="ui container" style={ {marginTop: "2rem"} }>
            {/* <Accordion items={items}/> */}
            {/* <Search /> */}
            {/* <button onClick={() => setShowDropdown(!showDropdown)}>Toggle Dropdown</button> */}
            {/* {showDropdown ? 
                <Dropdown 
                    onSelectedChange={setSelected}
                    selected={selected}
                    options={options}
                    label={"Select a Color"}
                /> : null
            } */}
            {/* {showAccordion()}
            {showList()}
            {showDropdown()}
            {showTranslate()} */}

            <Header />
            
            <Route path ="/">
                <Accordion items={items} />
            </Route>

            <Route path="/list">
                <Search />
            </Route>

            <Route path="/dropdown">
                <Dropdown 
                    label="Select a Color"
                    options={options}
                    selected={selected}
                    onSelectedChange={setSelected}
                />
            </Route>

            <Route path="/translate">
                <Translate />
            </Route>

            {/* <Translate /> */}
        </div>
    )
}