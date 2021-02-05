import React, { useState, useEffect } from 'react';
import './CSS/Banner.css';
import { Button } from '@material-ui/core';
import requests from '../Request';
import axios from '../axios'

const Banner = () => {

    const [movie, setMovie] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(requests.fetchNetflixOriginals);

            setMovie(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length - 1) 
                ]
            );
            return request;

        }
 
        fetchData();
    }, []);

    console.log('movie : ', movie)



    const truncate = (string, n) => {
        return (
            string?.length > n ? string.substr(0, n - 1) + '...' : string
        );
    };

    return (   

        <header
            className='banner'
            style={{
                backgroundSize: 'cover',
                backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
                backgroundPosition: 'center center',
            }}
        >
            <div className="banner__contents">
                <div className="banner__title">
                    {movie?.title || movie?.name || movie?.original_name}
                </div>
                <div className="banner__buttons">
                    <button className="banner__button">
                        Play
                    </button>
                    <button className="banner__button">
                        My List
                    </button>
                </div>
                <h1 className="banner__description">
                    {truncate(movie?.overview, 200)}
                </h1>
                
            </div>

            <div className="banner--fadeBottom" />
        </header>
    )
}

export default Banner
