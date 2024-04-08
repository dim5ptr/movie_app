import React, { useState } from "react";
import { Container, Segment, Header } from "semantic-ui-react";
import { useQuery } from "@tanstack/react-query";
import { fetchRatedMovies } from "./query";
import { ColumnDisplay } from "../home/column-display";
import { Navigate } from "react-router-dom";

export const Rated = () => {
    const DisplayType = {
        Movies: "movies",
        isRated: "ratedmovies",
    };

    const [activeTabs, setActiveTabs] = useState(DisplayType.Movies);

    const { data, isLoading } = useQuery({
        queryKey: ["ratedMovies"], // Include id in queryKey
        queryFn: fetchRatedMovies, // Fixed typo
    });

    if (localStorage.getItem("guest_session_id") === null) {
        return <Navigate to="/auth" />;
    }

    return (
        <Container style={{ marginTop: 50 }}>
            <Segment
                style={{
                    backgroundColor: "blue",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add shadow
                    transition: "background-color 0.3s ease", // Add transition for background color change
                }}
            >
                <div>
                    <Header as="h2" style={{ color: "white" }}>Rated Movies</Header> {/* Add color white for header */}
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : (
                        <ColumnDisplay
                            data={data.results}
                            displayType={DisplayType.Movies}
                            isRated={true}
                            style={{ animation: "fadeIn 1s ease" }} // Add fadeIn animation
                        />
                    )}
                </div>
            </Segment>
        </Container>
    );
};
