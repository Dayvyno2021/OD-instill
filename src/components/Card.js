import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({s}) => {
  return (
    <div className="card">
      <Link to={`/movie/${s.imdbID}`}>
        <div className="card-title"> {s.Title} </div>
        <div className="card-image">
          <img src={s.Poster} alt={s.Title} />
        </div>
        <ul className="card-labels">
          <li>
            <span>Year: </span>
            <span> {s.Year} </span>
          </li>
          <li>
            <span>Type:</span>
            <span style={{ textTransform: 'capitalize' }}> {s.Type} </span>
          </li>
        </ul>
      </Link>
    </div>
  )
}

export default Card