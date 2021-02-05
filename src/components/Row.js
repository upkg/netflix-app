import React, { useState, useEffect } from 'react';
import requests from '../Request';
import './CSS/Row.css'
import axios from '../axios'

const Row = ({ title, fetchUrl, isLargeRow = false }) => {

    const [movies, setMovies] = useState([]);

    const base_url= 'https://image.tmdb.org/t/p/original';
    

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }

        fetchData();
    },[fetchUrl])

    return (
        <div className='row'>
            <h2>{title}</h2>

            <div className="row__posters">
            {movies.map((movie) => (
                ((isLargeRow && movie.poster_path) ||
                    (!isLargeRow && movie.backdrop_path)
                    ) && (   
                        <>                         
                            <img 
                                key={movie.name}
                                className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                                src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                alt={movie.name}
                            />
                            <p className='row__posterTitle'>{movie?.title || movie?.name || movie?.original_name}</p>  
                        </>
                    )
                    
                               
            ))}

                {/* <div className="row__movieDetalis">
                    <h3>{movie.name}</h3>
                    <p>{movie.description}</p>*/}
            
            </div>
            
            
        </div>
    )
}

export default Row
