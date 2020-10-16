import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
    const [term, setTerm] = useState('wikipedia');
    const [debouncedTerm, setDebouncedTerm] = useState(term);
    const [results, setResults] = useState([]);

    // keeps track of term for whenever it changes and 
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedTerm(term);
        }, 1000);

        return () => {
            clearTimeout(timerId);
        };
    }, [term]);

    // we only want to run this whenever the component is first rendered or debouncedTerm changes
    useEffect(() => {
        const wikiSearch = async () => {
            const { data } = await axios.get('https://en.wikipedia.org/w/api.php?', {
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: debouncedTerm,
                },
            });

            setResults(data.query.search);
        }

        wikiSearch();

    }, [debouncedTerm]);

    // second argument controls when code gets exec'd
    // contains emtpy or smth inside array
    // 2nd argument controls which scenario we end up in
    //      - emtpy array -> run at initial render
    //      - ...nothing... -> run at initial render -> run after every re-render
    //      - [data] -> run at initial render -> run after every re-render if data has changed since last render
    // console.log("I run w/ every render");

    // wiki API: en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=programming

    // do not mark function passed into useEffect as async
    // useEffect(() => {
    //     // you could use a promise for async in useEffect hook
    //     // axios.get('asdfghjkl')
    //     //     .then((response) => {
    //     //         console.log(response.data);
    //     //     });

    //     // another way of writing an async function to be called in the useEffect hook
    //     // (async () => {

    //     // })();

    //     const wikiSearch = async () => {
    //         const { data } = await axios.get('https://en.wikipedia.org/w/api.php?', {
    //             params: {
    //                 action: 'query',
    //                 list: 'search',
    //                 origin: '*',
    //                 format: 'json',
    //                 srsearch: term
    //             }
    //         });
    //         setResults(data.query.search);
    //     }

    //     if (term && !results.length) {
    //         wikiSearch();
    //     } else {
    //         const timeOutId = setTimeout(() => {
    //             if (term) {
    //                 wikiSearch();
    //             }
    //         }, 500)
    
    //         return () => {
    //             clearTimeout(timeOutId);
    //         }
    //     }
    // }, [term, results.length]);

    const renderedResults = results.map((result) => {
        return (
            <div className="item" key={result.pageid}>
                <div className="right floated content">
                    <a 
                        className="ui button"
                        href={`https://en.wikipedia.org?curid=${result.pageid}`}
                    >
                        Go
                    </a>
                </div>
                <div className="content">
                    <div className="header">
                        {result.title}
                    </div>
                    <span dangerouslySetInnerHTML={ {__html: result.snippet} }></span>
                    {/* {result.snippet} */}
                </div>
            </div>
        )
    })

    const onInputSubmit = (e) => {
        e.preventDefault();
        setTerm(e.target.value);
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
            <div className="ui celled list">
                {renderedResults}
            </div>
        </div>
    )
}

export default Search;