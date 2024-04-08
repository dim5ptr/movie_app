import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Grid, Header, Loader, Segment, Image, List, Label, Rating } from "semantic-ui-react";
import { fetchMovieDetails } from "./query";

export const Movie = () => {
    const { id } = useParams();
    const [segmentStyle, setSegmentStyle] = useState({
        backgroundColor: "blue",
        color: "white",
        transition: "background-color 0.3s ease",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)"
    });

    if (!id) {
        return <div>Invalid Movie ID</div>;
    }

    const { data, isLoading } = useQuery({ 
        queryKey: ["movie", id], // Include id in queryKey
        queryFn: () => fetchMovieDetails(id) 
    });

    if (isLoading) {
        return <Loader active />;
    }

    const getRandomColor = () => {
        const colors = ["#FF5733", "#C70039", "#900C3F", "#581845", "#5D6D7E", "#2C3E50", "#E74C3C", "#9B59B6", "#3498DB", "#1ABC9C"];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    return (
        <div className="movie-container" style={{ marginTop: 50 }}>
            <Segment
                style={segmentStyle}
                onMouseEnter={() => setSegmentStyle({ ...segmentStyle, backgroundColor: "oceanblue" })}
                onMouseLeave={() => setSegmentStyle({ ...segmentStyle, backgroundColor: "blue" })}
            >
                <Header as="h2" textAlign="center" style={{ marginBottom: 20 }}>
                    {data.title}
                </Header>
                <Grid columns={2} divided textAlign="left">
                    <Grid.Row>
                        <Grid.Column width={6} textAlign="center">
                            <Image
                                src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
                                size="medium"
                                centered
                                rounded
                                style={{ animation: "fadeIn 1s ease", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)" }}
                            />
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <List divided relaxed>
                                <List.Item>
                                    <List.Header>Is The Movie For Adults:</List.Header>
                                    <List.Content>{data.adult ? "Yes" : "No"}</List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Header>Budget:</List.Header>
                                    <List.Content>${data.budget.toLocaleString()}</List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Header>Genres:</List.Header>
                                    <List.Content>
                                        <Label.Group>
                                            {data.genres.map((genre) => (
                                                <Label
                                                    key={genre.id}
                                                    style={{
                                                        backgroundColor: getRandomColor(),
                                                        marginRight: '5px',
                                                        marginBottom: '5px',
                                                        color: 'white',
                                                        borderRadius: '5px',
                                                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                                    }}
                                                >
                                                    {genre.name}
                                                </Label>
                                            ))}
                                        </Label.Group>
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Header>Rating:</List.Header>
                                    <List.Content>
                                        <Rating icon="star" defaultRating={data.vote_average} maxRating={10} disabled />
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Header>Popularity:</List.Header>
                                    <List.Content>{data.popularity}</List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Header>Production Companies:</List.Header>
                                    <List.Content>{data.production_companies.map((company) => company.name).join(", ")}</List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Header>Release Date:</List.Header>
                                    <List.Content>{data.release_date}</List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Header>Revenue:</List.Header>
                                    <List.Content>${data.revenue.toLocaleString()}</List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Header>Runtime:</List.Header>
                                    <List.Content>{data.runtime} minutes</List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Header>Language:</List.Header>
                                    <List.Content>{data.original_language}</List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Header>Description:</List.Header>
                                    <List.Content>{data.overview}</List.Content>
                                </List.Item>
                            </List>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </div>
    );
};
