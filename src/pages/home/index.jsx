import React, { useState, useEffect } from 'react';
import { Input, Grid, Segment } from 'semantic-ui-react';
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

    // Fungsi untuk mendapatkan data tidak difilter
    const getUnfilteredData = () => {
        // Lakukan pengecekan jika movieData tersedia, kembalikan movieData.results, jika tidak, kembalikan array kosong
        return movieData?.results || [];
    };

    return (
        <div style={{ marginTop: 50 }}>
            <Input
                placeholder="Cari film..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                style={{ 
                    marginBottom: 50, 
                    maxWidth: 400, 
                    margin: '0 auto', 
                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)' // Bayangan
                }}
                size="large"
                fluid // Membuat input memenuhi lebar container
                icon="search" // Menambahkan ikon search pada input
            />

            <Grid columns={2} stackable textAlign="center" style={{ marginTop: 40 }}> {/* Menghilangkan properti divided */}
                <Grid.Column>
                    <Segment raised style={{ minHeight: 200, borderRadius: 10, boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}>
                        <h2 style={{ marginBottom: 20 }}>Hasil Pencarian</h2>
                        <ColumnDisplay data={filteredMovies} displayType={DisplayType.Movies}/> 
                    </Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment raised style={{ minHeight: 200, borderRadius: 10, boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}>
                        <h2 style={{ marginBottom: 20 }}>Film Populer</h2>
                        <ColumnDisplay data={getUnfilteredData()} displayType={DisplayType.Movies}/> 
                    </Segment>
                </Grid.Column>
            </Grid>
        </div>
    );
};
