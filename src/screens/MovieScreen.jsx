import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetMoviesByIdentityQuery } from "../slices/apiSlices";
import Loader from "../components/Loader";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Person2Icon from '@mui/icons-material/Person2';
import Person3Icon from '@mui/icons-material/Person3';
import FlagIcon from '@mui/icons-material/Flag';
import TranslateIcon from '@mui/icons-material/Translate';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";

const MovieScreen = () => {

  //Get the url params
  const params = useParams();

  //The movie url to be sent to the OMDB database
  const [movielUrl, setMovieUrl] = useState('')

  //The redux RTK function to make request from the OMDb database
  const { isLoading, data } = useGetMoviesByIdentityQuery(process.env.REACT_APP_APIKEY.concat(`&i=${movielUrl}`));

  useEffect(() => {

    //Make a fresh request from the OMDB database once params.id is available or when params.id is not equal to data.imdbID
    if (params.id || (params.id !== data.imdbID)) {
      setMovieUrl(params.id)
    }

  },[params, data])

  return (
    <div className='moviescreen'>
      <Link to='/' className="moviescreen-back">
        <ArrowBackIcon color="secondary" fontSize="large" />
      </Link>
      {isLoading && <Loader/>}
      <div className="movie">
        <h1 className="header-3 movie-title"> {data?.Title} </h1>
        <div className="movie-image-cover">
          <img src={data?.Poster} alt={data?.Title} />
        </div>
        <div className="movie-details">
          <div className="movie-details-actors">
            <h3 className="header-3">Actors</h3>
            <ul className="actors-list">
              {
                data?.Actors?.split(',').map((actor) => (
                  <li key={actor} className="actors-list-person space-3">
                    <Person2Icon color="secondary" className="actors-list-icon" />
                    <span className="person text-1"> {actor} </span> 
                  </li>
                ))
              }
            </ul>

          </div>
          <div className="movie-details-awards movie-content">
            <h3 className="header-3 mb-1">Awards</h3>
            <div className="movie-award space-3">
              <EmojiEventsIcon color='secondary' />
              <span className="award text-1"> {data?.Awards} </span>
            </div>
          </div>
          <div className="movie-details-country movie-content">
            <h3 className="header-3 mb-1">Countries</h3>
            <div className="movie-award space-3">
              <FlagIcon color='secondary' />
              <span className="award text-1"> {data?.Country} </span>
            </div>
          </div>
          <div className="movie-details-director movie-content">
            <h3 className="header-3 mb-1">Director</h3>
            <div className="movie-award space-3">
              <Person3Icon color='secondary' />
              <span className="award text-1"> {data?.Director} </span>
            </div>
          </div>

          <div className="movie-details-actors">
            <h3 className="header-3">Genre</h3>
            <ul className="actors-list">
              {
                data?.Genre?.split(',').map((actor) => (
                  <li key={actor} className="actors-list-person space-3">
                    <DoneAllIcon color="secondary" className="actors-list-icon" />
                    <span className="person text-1"> {actor} </span> 
                  </li>
                ))
              }
            </ul>
          </div>

          <div className="movie-details-actors">
            <h3 className="header-3">Language</h3>
            <ul className="actors-list">
              {
                data?.Language?.split(',').map((actor) => (
                  <li key={actor} className="actors-list-person space-3">
                    <TranslateIcon color="secondary" className="actors-list-icon" />
                    <span className="person text-1"> {actor} </span> 
                  </li>
                ))
              }
            </ul>
          </div>

          <div className="movie-details-director movie-content">
            <h3 className="header-3 mb-1">Plot</h3>
            <div className="movie-award space-3">
              <p className="award text"> {data?.Plot} </p>
            </div>
          </div>

          <div className="movie-details-actors">
            <h3 className="header-3">Writer</h3>
            <ul className="actors-list">
              {
                data?.Writer?.split(',').map((actor) => (
                  <li key={actor} className="actors-list-person space-3">
                    <Person2Icon color="secondary" className="actors-list-icon" />
                    <span className="person text-1"> {actor} </span> 
                  </li>
                ))
              }
            </ul>
          </div>

        </div>
      </div>
    </div>
  )
}

export default MovieScreen