import React,{useEffect,useState} from 'react'
import "./RowPost.css"
import axios from '../../axios';
import { imageUrl, API_KEY} from '../../Constants/Constants'
import YouTube from 'react-youtube';


function RowPost(props) {
  const [movies, setMovies] = useState([]);
  const [youtubeId, setYoutubeId] = useState('');
  const [timeoutId, setTimeoutId] = useState(null);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleMovie = (id) => {
    console.log(id)
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((res) => {
      if (res.data.results.length !== 0) {
        const videoKey = res.data.results[0]?.key || '';
        setYoutubeId(videoKey);
      } else {
        alert('Trailer Not Available');
      }
    })
    .catch((error) => {
      alert('Error fetching movie videos:', error);
    });
  };

  const handleMouseEnter = (id) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setTimeoutId(setTimeout(() => {
      handleMovie(id);
    }, 1000));
  };
  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    handleClosePlayer();
  };

  const handleClosePlayer = () => {
    setYoutubeId('');
  };


  

  useEffect(() => {
    axios.get(props.url).then((res) => {
      console.log(res.data);
      setMovies(res.data.results);
    }).catch((err) => {
      alert('Network Error');
    });
  }, []);


  return (
    <div className='row'>
      <h2>{props.title}</h2>
      <div className='posters'>
      {movies.map((obj) => (
          <div key={obj.id} onMouseEnter={() => handleMouseEnter(obj.id)} onMouseLeave={handleMouseLeave} className="poster-container">
            <img
              className={props.isSmall ? 'smallPoster' : 'poster'}
              src={`${imageUrl + obj.backdrop_path}`}
              alt="poster"
            />
            <p>{obj.title || obj.original_name}</p>
          </div>
        ))}
        
      </div>
      {youtubeId ? (
        <div className='trailer'>
          
          <YouTube videoId={youtubeId} opts={opts} />
        </div>
      ):""}
    </div>
  )
}

export default RowPost
