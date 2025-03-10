"use client"
import { FormEvent, useState } from "react";
import React from "react";

import LanguageSearch from "./components/languageSearch";
export default function Page() {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [lang, setLang] = useState('ja')
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/translate/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: inputText, dest_language: lang })
        })
        if (response.ok) {
            const data = await response.json();

            console.log('Success:', data);
            setOutputText(data.translated_text)
        }
        else {
            console.error('Error:', response.statusText);
        }
    }
    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                <textarea id="input" name="input" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Input Text">

                </textarea>
                <textarea id="output" name="output" value={outputText} readOnly>

                </textarea>
                <button type="submit" className="bg-violet-500 hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700">Submit</button>
            </form>
            <div style={{ padding: '20px' }}>
                <h1>Language Search</h1>
                <LanguageSearch />
            </div>
        </>
    )

}