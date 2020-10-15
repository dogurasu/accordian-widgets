import React, { useState, useEffect } from 'react';

const Search = () => {
    const [term, setTerm] = useState('');

    // second argument controls when code gets exec'd
    // contains emtpy or smth inside array
    // 2nd argument controls which scenario we end up in
    //      - emtpy array -> run at initial render
    //      - ...nothing... -> run at initial render -> run after every re-render
    //      - [data] -> run at initial render -> run after every re-render if data has changed since last render
     
    useEffect(() => {
        console.log('asdfghjkl');
    }, [term]);

    const onInputSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter Search Term</label>
                    <input 
                        // onSubmit={}
                        value={term}
                        onChange={e => setTerm(e.target.value)}
                        className="input"
                    />
                </div>
            </div>
        </div>
    )
}

export default Search;