import React, { useState, useEffect } from 'react';
import languagesData from '../lib/lang.json';

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
        if (searchTerm.length > 1) {
            const results = languagesData.filter(language =>
                language.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                language.nativeName.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredLanguages(results);
        } else {
            setFilteredLanguages([]);
        }
    }, [searchTerm]);

    const handleSelect = (language: Language) => {
        setSelectedLanguage(language);
        setSearchTerm('');
        setFilteredLanguages([]);
    };

    return (
        <div className="max-w-md mx-auto space-y-6">
            {/* Search Input */}
            <div className="relative">
                <input
                    type="text"
                    placeholder="🔍 Search for a language..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 text-lg border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-400"
                />
            </div>

            {/* Language Results */}
            {searchTerm.length > 1 && (
                <div className="bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden">
                    {filteredLanguages.map(language => (
                        <div
                            key={language.code}
                            onClick={() => handleSelect(language)}
                            className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b last:border-b-0"
                        >
                            <div className="font-medium text-gray-800">{language.name}</div>
                            <div className="text-sm text-gray-500">{language.nativeName}</div>
                        </div>
                    ))}
                </div>
            )}

            {/* Selected Language */}
            {selectedLanguage && (
                <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-inner">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Selected Language</h3>
                    <div className="space-y-1">
                        <div className="text-xl font-medium text-gray-900">{selectedLanguage.name}</div>
                        <div className="text-sm text-gray-600">{selectedLanguage.nativeName}</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LanguageSearchSelect;