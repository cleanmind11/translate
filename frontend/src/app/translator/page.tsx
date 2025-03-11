"use client"
import { FormEvent, useState } from "react";
import React from "react";
import LanguageSearch from "./components/languageSearch";

export default function Page() {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [lang, setLang] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/translate/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: inputText, dest_language: lang })
        });
        if (response.ok) {
            const data = await response.json();
            setOutputText(data.translated_text);
        } else {
            console.error('Error:', response.statusText);
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Translation Section */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Language Search</h2>
                    <LanguageSearch lang={lang} setLang={setLang} />
                </div>
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
                        <div className="space-y-4">
                            <label htmlFor="input" className="block text-lg font-medium text-gray-700">
                                Input Text
                            </label>
                            <textarea
                                id="input"
                                name="input"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Enter text to translate..."
                                className="w-full h-64 p-4 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all"
                            />
                        </div>
                        <div className="space-y-4">
                            <label htmlFor="output" className="block text-lg font-medium text-gray-700">
                                Translated Text
                            </label>
                            <textarea
                                id="output"
                                name="output"
                                value={outputText}
                                readOnly
                                className="w-full h-64 p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50 resize-none"
                            />
                        </div>
                        <div className="md:col-span-2 flex justify-end">
                            <button
                                type="submit"
                                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
                            >
                                Translate
                            </button>
                        </div>
                    </form>
                </div>

                {/* Language Search Section */}

            </div>
        </div>
    );
}