export const fetchRatedMovies = async () => {
    try {
        const res = await fetch(
            `https://api.themoviedb.org/3/guest_session/${localStorage.getItem("guest_session_id")}/rated/movies?language=en-US&page=1&sort_by=created_at.as&api_key=${import.meta.env.VITE_API_KEY}`,
        );

        const data = await res.json();
        console.log(data);

        return data;
    } catch (error) {
        console.error("Error fetching movies:", error);
        throw new Error("Failed to fetch movies");
    }
};
