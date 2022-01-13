import classes from "./DetailInfo.module.css";
import Genres from "./Genres";
import { Link } from "react-router-dom";

interface DetailInfoProps {
  title?: string;
  name?: string;
  overview?: string;
  runtime?: string;
  release_date?: string;
  genres?: { name: string; id: number }[];
  /////////////
  backdrop_path?: string;
  poster_path?: string;
  original_title?: string;
  ////////////
  director?: string;
  media?: string;
  movieId: number;
  hasButton?: boolean;
}

const DetailInfo: React.FC<DetailInfoProps> = ({
  title,
  overview,
  runtime,
  release_date,
  director,
  genres,
  media,
  movieId,
  hasButton,
}) => {
  return (
    <div className={classes["detail-info"]}>
      <div className={classes["detail-title"]}>
        <h1>{title}</h1>
      </div>
      <div
        className={`${classes["detail-typography"]} ${classes["detail-description"]}`}
      >
        {overview}
      </div>
      <div className={classes["detail-typography"]}>
        {(runtime && media) !== "tv" && Number(runtime) > 0 && (
          <span>Duration: {`${runtime}`}</span>
        )}
        {release_date && release_date && (
          <span>Release date: {release_date}</span>
        )}
        {director && <span>Director: {director}</span>}
        {genres && <Genres genres={genres} />}
      </div>
      {hasButton &&
        (media === "movie" ? (
          <Link to={`/watch/${media}/${movieId}`}>
            <button className={classes["button-watch"]}>Watch now</button>
          </Link>
        ) : (
          <Link to={`/watch/${media}/${movieId}/s/1/e/1`}>
            <button className={classes["button-watch"]}>Watch now</button>
          </Link>
        ))}
    </div>
  );
};

export default DetailInfo;
