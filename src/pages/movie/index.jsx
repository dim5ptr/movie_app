import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Grid, Header, Loader, Segment, Image, List, Label, Rating } from "semantic-ui-react";
import { fetchMovieDetails } from "./query";

export const Movie = () => {
    const { id } = useParams();
    const [segmentStyle, setSegmentStyle] = useState({
        backgroundColor: "#87CEEB",
        color: "black",
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
        <div className="movie-container" style={{ marginTop: 50, marginBottom: 50 }}>
            <Segment
                style={segmentStyle}
                onMouseEnter={() => setSegmentStyle({ ...segmentStyle, backgroundColor: "#87CEEB" })}
                onMouseLeave={() => setSegmentStyle({ ...segmentStyle, backgroundColor: "#87CEEB" })}
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
                                    <List.Header style={{ color: 'black', fontSize: '1.1em' }}>Is The Movie For Adults:</List.Header>
                                    <List.Content style={{ color: '#333', fontSize: '1em' }}>{data.adult ? "Yes" : "No"}</List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Header style={{ color: 'black', fontSize: '1.1em' }}>Budget:</List.Header>
                                    <List.Content style={{ color: '#333', fontSize: '1em' }}>${data.budget.toLocaleString()}</List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Header style={{ color: 'black', fontSize: '1.1em' }}>Genres:</List.Header>
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
                                    <List.Header style={{ color: 'black', fontSize: '1.1em' }}>Rating:</List.Header>
                                    <List.Content style={{ color: '#333', fontSize: '1em' }}>
                                        <Rating icon="star" defaultRating={data.vote_average} maxRating={10} disabled />
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Header style={{ color: 'black', fontSize: '1.1em' }}>Popularity:</List.Header>
                                    <List.Content style={{ color: '#333', fontSize: '1em' }}>{data.popularity}</List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Header style={{ color: 'black', fontSize: '1.1em' }}>Production Companies:</List.Header>
                                    <List.Content style={{ color: '#333', fontSize: '1em' }}>{data.production_companies.map((company) => company.name).join(", ")}</List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Header style={{ color: 'black', fontSize: '1.1em' }}>Release Date:</List.Header>
                                    <List.Content style={{ color: '#333', fontSize: '1em' }}>{data.release_date}</List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Header style={{ color: 'black', fontSize: '1.1em' }}>Revenue:</List.Header>
                                    <List.Content style={{ color: '#333', fontSize: '1em' }}>${data.revenue.toLocaleString()}</List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Header style={{ color: 'black', fontSize: '1.1em' }}>Runtime:</List.Header>
                                    <List.Content style={{ color: '#333', fontSize: '1em' }}>{data.runtime} minutes</List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Header style={{ color: 'black', fontSize: '1.1em' }}>Language:</List.Header>
                                    <List.Content style={{ color: '#333', fontSize: '1em' }}>{data.original_language}</List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Header style={{ color: 'black', fontSize: '1.1em' }}>Description:</List.Header>
                                    <List.Content style={{ color: '#333', fontSize: '1em' }}>{data.overview}</List.Content>
                                </List.Item>
                            </List>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </div>
    );
};
