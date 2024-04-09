import React, { useState, useEffect } from 'react';
import { Input, Grid, Segment, Dropdown } from 'semantic-ui-react';
import { ColumnDisplay } from './column-display';
import { useQuery } from '@tanstack/react-query';
import { Navigate } from 'react-router-dom';
import { useSearch } from '../../components/search';
import { fetchMovies } from './query'; 

const DisplayType = {
    Movies: "movies",
};

export const Home = () => {
    const { data: movieData } = useQuery({
        queryKey: ["movies"],
        queryFn: fetchMovies
    });

    useEffect(() => {
        fetchMovies("popular");
    }, []);

    if (localStorage.getItem("guest_session_id") === null) {
        return <Navigate to="/auth" />;
    }

    const { searchQuery, handleSearch, data: filteredMovies } = useSearch(movieData?.results || []);
    const [imdbFilter, setImdbFilter] = useState(0);

    const getUnfilteredData = () => {
        return movieData?.results || [];
    };

    const imdbOptions = [
        { key: 1, text: 'All', value: 0 },
        { key: 4, text: 'Above 9', value: 9 },
        { key: 3, text: 'Above 8', value: 8 },
        { key: 2, text: 'Above 7', value: 7 },
        { key: 5, text: 'Above 6', value: 6 },
        { key: 6, text: 'Above 5', value: 5 },
        { key: 7, text: 'Above 4', value: 4 },
        { key: 8, text: 'Above 3', value: 3 },
        { key: 9, text: 'Above 2', value: 2 },
        { key: 10, text: 'Above 1', value: 1 }
    ];
    
    const handleImdbFilterChange = (e, { value }) => {
        setImdbFilter(value);
    };

    const filterByImdb = (movie) => {
        if (imdbFilter === 0) return true;
        return movie.vote_average >= imdbFilter;
    };

    return (
        <div style={{ marginTop: 50 }}>
            <Grid columns={2} stackable textAlign="center" style={{ marginTop: 40 }}>
                <Grid.Column>
                    <Input
                        placeholder="Search for a movie..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        style={{ 
                            minHeight: 50,
                            maxWidth: 1000, 
                            margin: '0 auto', 
                            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)' 
                        }}
                        size="large"
                        fluid
                        icon="search"
                    />
                </Grid.Column>
                <Grid.Column stackable textAlign="center" style={{ paddingLeft: '10px' }}>
                    <Dropdown
                        placeholder='Filter by IMDb rating'
                        selection
                        options={imdbOptions}
                        onChange={handleImdbFilterChange}
                        style={{ 
                            minHeight: 50,
                            maxWidth: 1000, 
                            margin: '0 auto', 
                            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)' 
                        }}
                        size="large"
                        fluid
                    />
                </Grid.Column>
            </Grid>

            {searchQuery && (
                <Grid columns={1} stackable textAlign="center" style={{ marginTop: 20, marginBottom: 40 }}>
                    <Grid.Column>
                        <Segment raised style={{ minHeight: 200, borderRadius: 10, boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}>
                            <h2 style={{ marginBottom: 20 }}>Search Results</h2>
                            <ColumnDisplay data={filteredMovies.filter(filterByImdb)} displayType={DisplayType.Movies}/> 
                        </Segment>
                    </Grid.Column>
                </Grid>
            )}

            {!searchQuery && (
                <Grid columns={1} stackable textAlign="center" style={{ marginTop: 10 , marginBottom: 40}}>
                    <Grid.Column>
                        <Segment raised style={{ minHeight: 200, borderRadius: 10, boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}>
                            <h2 style={{ marginBottom: 20 }}>Popular Movies</h2>
                            <ColumnDisplay data={getUnfilteredData().filter(filterByImdb)} displayType={DisplayType.Movies}/> 
                        </Segment>
                    </Grid.Column>
                </Grid>
            )}
        </div>
    );
};
