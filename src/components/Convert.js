import React, { useState, useEffect} from 'react';
import axios from 'axios';


const Convert = ({ language, text }) => {
    const [translated, setTranslated] = useState('');
    const [debouncedText, setDebouncedText] = useState(text);

    // we only want to run this useEffect hook initially and if debouncedText changes
    // if we receive new text, we will cancel the setTimeout and reset it
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedText(text);
        }, 500);

        return () => {
            clearTimeout(timerId);
        }
    }, [text])


    // any time we receive a new language or text, useEffect hook executes
    // whenever we get a new lang or text, we're going to make a request to the API
    // second object is the body which we are supposed to leave empty according to the Translate API
    useEffect(() => {
        // console.log('New language or text');
        const doTranslation = async () => {
            const { data } = await axios.post('https://translation.googleapis.com/language/translate/v2', {}, {
                params: {
                    q: debouncedText,
                    target: language.value,
                    key: process.env.REACT_APP_API_KEY
                }
            });

            console.log("Data: " + data)

            setTranslated(data.data.translations[0].translatedText);
        };
        doTranslation();
    }, [language, debouncedText])

    return (
        <div>
            <h1 className="ui header">{translated}</h1>
        </div>
    );
};

export default Convert;