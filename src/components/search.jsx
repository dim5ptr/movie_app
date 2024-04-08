import { useState } from 'react';
import axios from 'axios';

export const useSearch = (initialData) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState(initialData);

    const handleSearch = async (query) => {
        setSearchQuery(query);
        try {
            // Melakukan pencarian film berdasarkan IMDb API
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=cd5d2b59959a95a39ee837bdfb0269c0&query=${query}`);
            setData(response.data.results);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return {
        searchQuery,
        handleSearch,
        data,
        setData
    };
};
