export const fetchMovieDetails = async (movieId) => {
    try {
        const res = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
            {
                headers: {
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZDVkMmI1OTk1OWE5NWEzOWVlODM3YmRmYjAyNjljMCIsInN1YiI6IjY1NzA3NzAxNDFhZDhkMDZlNGQxZmRiOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1P4Z3uKGwcdZ2sbrGw13akfUEtRPrHeA-bqbcxMP9qM'
                },
            }
        );

        const data = await res.json();
        console.log(data);

        return data;
    } catch (error) {
        console.error("Error fetching movies:", error);
        throw new Error("Failed to fetch movies");
    }
};
