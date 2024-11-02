import React, { useState, useEffect } from 'react';
import './Main.css';

export default function Main() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [randomMovie, setRandomMovie] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('http://moyeothon.limikju.com:8080/api/movies?page=0&size=10');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                console.log(data);
                setMovies(data.result.content);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    useEffect(() => {
        if (movies.length > 0) {
            const randomIndex = Math.floor(Math.random() * movies.length);
            setRandomMovie(movies[randomIndex]);
        }
    }, [movies]);

    if (loading) {
        return <div className='mainPage'>Loading...</div>;
    }

    if (error) {
        return <div className='mainPage'>Error: {error}</div>;
    }

    if (!randomMovie) {
        return <div className='mainPage'>No movies available</div>;
    }

    return (
        <div className='mainPage'>
            <div className='mainLogo'>Logo</div>
            <div className='mainContainer'>
                <div key={randomMovie.id} className='movieItem'>
                    <div>
                        <img src={randomMovie.posterUrl} alt={randomMovie.title} className='mainPoster' />
                    </div>
                    <div className='mainInfo'>
                        <div className='mainInfoTitle'>{randomMovie.title} ({new Date(randomMovie.releaseDate).getFullYear()})</div>
                        <div className='mainInfoSubTitle'>{randomMovie.subtitle}</div>
                        <div className='movieInfoContainer'>
                            <div className='movieInfo'>개봉일 ㅣ {randomMovie.releaseDate}</div>
                            <div className='movieInfo'>감독 ㅣ {randomMovie.directors}</div>
                        </div>
                        <div className='mainInfoContent'>
                            <div className='mainInfoContentNumber'>{randomMovie.recommendCount}</div>
                            <div className='mainInfoContentText'>명이 이 영화를 추천해요!👍🏻</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
