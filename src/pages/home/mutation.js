export const rateMovie = async (movieId, rating) => {
    try {
        const res = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${localStorage.getItem("guest_session_id")}&api_key=${import.meta.env.VITE_API_KEY}`,
            {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "content-type": "application/json;charset=utf-8",
                },
                body: JSON.stringify({ value: rating }), // Use JSON.stringify to convert object to JSON string
            }
        );

        const data = await res.json();
        console.log(data);

        return data;
    } catch (error) {
        console.error("Error during login mutation:", error);
        throw new Error("Failed to perform login mutation");
    }
};
