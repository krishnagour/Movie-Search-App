import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Grid, Card, CardMedia, CardContent, CardActions } from '@mui/material';
import './App.css';

function App() {
    const [title, setTitle] = useState('');
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.get(`http://localhost:5000/api/movies?title=${title}`);
            if (response.data.Response === 'True') {
                setMovies(response.data.Search);
            } else {
                setError('No results found');
            }
        } catch (error) {
            setError('Failed to fetch data');
        }
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h2" align="center" gutterBottom>
                Movie Search
            </Typography>
            <form onSubmit={handleSearch} style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <TextField
                    variant="outlined"
                    label="Enter movie title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    style={{ marginRight: '10px', flex: 1 }}
                />
                <Button variant="contained" color="primary" type="submit">
                    Search
                </Button>
            </form>
            {error && <Typography color="error" align="center">{error}</Typography>}
            <Grid container spacing={3}>
                {movies.map((movie) => (
                    <Grid item xs={12} sm={6} md={4} key={movie.imdbID}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="300"
                                image={movie.Poster !== 'N/A' ? movie.Poster : "https://via.placeholder.com/400"}
                                alt={movie.Title}
                            />
                            <CardContent>
                                <Typography variant="h5">{movie.Title}</Typography>
                                <Typography color="textSecondary">Year: {movie.Year}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary">View Details</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default App;
