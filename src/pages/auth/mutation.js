export const mutationLogin = async () => {
    try {
        const res = await fetch(
            "https://api.themoviedb.org/3/authentication/guest_session/new",
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
        console.error("Error during login mutation:", error);
        throw new Error("Failed to perform login mutation");
    }
};
