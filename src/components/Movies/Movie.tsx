import classes from "./Movie.module.css";
import { Link } from "react-router-dom";
import { baseImageUrl } from "../../App";

interface MovieProps {
  key?: number;
  id: number;
  title: string;
  posterUrl: string;
  media: string;
}

const Movie: React.FC<MovieProps> = ({ posterUrl, id, title, media }) => {
  return (
    <div className={classes.movie}>
      <Link to={`/details/${media}/${id}`}>
        <img src={`${baseImageUrl}${posterUrl}`} alt={`${id}`} />
      </Link>
      <Link to={`/details/${media}/${id}`}>
        <span>{title}</span>
      </Link>
    </div>
  );
};

export default Movie;
