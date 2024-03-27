import React, { useEffect, useState } from 'react';
import './Banner.css';
import axios from '../../axios';
import {API_KEY,imageUrl} from '../../Constants/Constants';


function Banner() {
  const [movie, setMovie] = useState();
  useEffect(() => {
    axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then((res)=>{
      console.log(res.data.results[0])
    const randomIndex = Math.floor(Math.random() * res.data.results.length);
    setMovie(res.data.results[randomIndex]);
    })
  },[])
  return (
    <div div  style={{backgroundImage: `url(${movie ? imageUrl+movie.backdrop_path : ''})`}} className='Banner'>
        <div className='content'>
            <h1 className='title'>{movie ? movie.title : ""}</h1>
            <div className='banner_button'>
                <button className='button'>Play</button>
                <button className='button'>My list</button>
            </div>
            <h1 className='discription'>{movie ? movie.overview : "" }</h1>
        </div>
        <div className='fadeBottom'>

        </div>
      
    </div>
  )
}

export default Banner
