import React, { useState } from 'react';
import { Grid, Card, Form, Label, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { rateMovie } from './mutation';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const DisplayType = {
  Movies: "movies",
};

export const ColumnDisplay = ({ data, displayType }) => {
    const [rating, setRating] = useState(0);

    const onSuccess = () => {
        toast.success("Successfully rated!");
    }

    const onError = () => {
        toast.error("Something went wrong!");
    }

    const { mutate: rateMovieMutation } = useMutation({
        mutationKey: ["rateMovie"], 
        mutationFn: (id) => rateMovie(id, rating),
        onSuccess,
        onError,
    });
    
    const rate = displayType === DisplayType.Movies && rateMovieMutation;

    return (
        <div>
            <Grid columns={5} stackable centered verticalAlign="top" padded="vertically">
                {data.map((displayData) => (
                    <Grid.Column key={displayData.id}>
                        <Card.Group>
                            <Link to={`/movie/${displayData.id}`}>
                                <Card
                                    fluid
                                    image={`https://image.tmdb.org/t/p/original/${displayData.poster_path}`}
                                    header={
                                        <div>
                                            <Icon name='film' size='big' />
                                            {displayData.title}
                                        </div>
                                    }
                                    meta={
                                        <div>
                                            <Icon name='calendar alternate outline' size='small' />
                                            Release Date: {displayData.release_date} | 
                                            <Icon name='star' size='small' />
                                            Rating: {displayData.vote_average}
                                        </div>
                                    }
                                    style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', transition: '0.3s' }}
                                />
                                <Card.Content>
                                    {/* Menampilkan rating jika displayType adalah "ratedmovies" */}
                                    {displayType === DisplayType.RatedMovies && (
                                        <Label color='teal' ribbon> Your Rating : {displayData.rating}</Label>
                                    )}
                                </Card.Content>
                            </Link>
                            <Form style={{ marginTop: 5 }}>
                                <Form.Group inline>
                                    <Form.Field>
                                        <Form.Input
                                            type="number"
                                            min="1"
                                            max="10"
                                            step="0.5"
                                            onChange={(e) => setRating(Number(e.target.value))}
                                            action={{
                                                color: "blue",
                                                labelPosition: "right",
                                                icon: "star",
                                                content: "Rate",
                                                onClick: () => rate(displayData.id), // Memanggil mutate di sini
                                                style: { backgroundColor: '#0047AB', color: 'white', cursor: 'pointer' }
                                            }}
                                        />
                                    </Form.Field>
                                </Form.Group>
                            </Form>
                        </Card.Group>
                    </Grid.Column>
                ))}
            </Grid>
        </div>
    );
};
