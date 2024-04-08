// query.js

import axios from 'axios';

export const fetchMovies = async (query) => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=cd5d2b59959a95a39ee837bdfb0269c0&query=${query}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw new Error('Failed to fetch movies');
    }
};
