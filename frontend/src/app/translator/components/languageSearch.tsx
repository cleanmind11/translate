import React, { useState, useEffect } from 'react';
import languagesData from '../lib/lang.json'; // Adjust the path as necessary

interface Language {
    code: string;
    name: string;
    nativeName: string;
}

const LanguageSearchSelect: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredLanguages, setFilteredLanguages] = useState<Language[]>([]);
    const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);

    useEffect(() => {
        // Filter languages based on the search term
        if (searchTerm.length > 1) {
            const results = languagesData.filter(language =>
                language.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                language.nativeName.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredLanguages(results);
        } else {
            setFilteredLanguages([]); // Clear the list if the search term is too short
        }
    }, [searchTerm]);

    const handleSelect = (language: Language) => {
        setSelectedLanguage(language);
        setSearchTerm(''); // Clear the search term after selection
        setFilteredLanguages([]); // Clear the filtered list after selection
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search for a language..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul>
                {searchTerm.length > 1 && filteredLanguages.map(language => (
                    <li
                        key={language.code}
                        onClick={() => handleSelect(language)}
                        style={{ cursor: 'pointer' }}
                    >
                        {language.name} ({language.nativeName})
                    </li>
                ))}
            </ul>
            {selectedLanguage && (
                <div>
                    <h3>Selected Language:</h3>
                    <p>{selectedLanguage.name} ({selectedLanguage.nativeName})</p>
                </div>
            )}
        </div>
    );
};

export default LanguageSearchSelect;
