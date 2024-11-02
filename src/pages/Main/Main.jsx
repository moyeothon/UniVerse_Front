import React, { useState, useEffect } from 'react';
import './Main.css';

export default function Main() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) {
        return <div className='mainPage'>Loading...</div>;
    }

    if (error) {
        return <div className='mainPage'>Error: {error}</div>;
    }

    return (
        <div className='mainPage'>
            <div className='mainLogo'>Logo</div>
            <div className='mainContainer'>
                {movies.map((movie) => (
                    <div key={movie.id} className='movieItem'>
                        <div>
                            <img src={movie.posterUrl} alt={movie.title} className='mainPoster' />
                        </div>
                        <div className='mainInfo'>
                            <div className='mainInfoTitle'>{movie.title} ({new Date(movie.releaseDate).getFullYear()})</div>
                            <div className='mainInfoSubTitle'>{movie.subtitle}</div>
                            <div className='movieInfoContainer'>
                                <div className='movieInfo'>개봉일 ㅣ {movie.releaseDate}</div>
                                <div className='movieInfo'>감독 ㅣ {movie.directors}</div>
                            </div>
                            <div className='mainInfoContent'>
                                <div className='mainInfoContentNumber'>N</div>
                                <div className='mainInfoContentText'>명이 이 영화를 추천해요!👍🏻</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
