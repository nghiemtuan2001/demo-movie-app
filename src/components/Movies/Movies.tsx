import React, { useEffect, useState } from "react";
import classes from "./Movies.module.css";
import Movie from "./Movie";
import { Link, useParams } from "react-router-dom";
import { baseUrl, apiKey } from "../../App";
import LoadingSpinner from "./../UI/LoadingSpinner";
import axios from "axios";

interface MoviesProps {
  title?: string;
  url?: string;
  fetchedMovies?: [];
  limit?: number;
  mediaProp?: string;
  mediaTitleProp?: string;
  isHome?: boolean;
}
interface MovieState {
  id: number;
  title: string;
  name: string;
  poster_path: string;
  media_type: string;
}

const Movies: React.FC<MoviesProps> = ({
  title,
  url,
  fetchedMovies,
  limit,
  mediaProp,
  mediaTitleProp,
  isHome,
}) => {
  const [movies, setMovies] = useState<MovieState[]>([]);
  const [page, setPage] = useState(1);
  const params = useParams();
  const mediaTitle = mediaTitleProp || (params.mediaTitle as string);
  const media = mediaProp || (params.media as string);
  const mediaUrl =
    (["trending", "discover"].includes(mediaTitle)
      ? baseUrl?.concat(
          mediaTitle ? `/${mediaTitle}` : "",
          media ? `/${media}` : "",
          mediaTitle === "trending" ? "/week" : "",
          `?api_key=${apiKey}&page=`
        )
      : baseUrl?.concat(
          media ? `/${media}` : "",
          mediaTitle ? `/${mediaTitle}` : "",
          `?api_key=${apiKey}&page=`
        )) || "";

  const handleCapitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const handleLoadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    const handleFetchMovies = async (url: string, page: number) => {
      let promises = [];
      for (let i = 1; i <= page; i++) {
        const req = await axios.get(url + i);
        const res = await req.data;
        promises.push(res);
      }
      const allMovies = await axios.all(promises);
      const mappedAllMovies = allMovies.map((movies) => movies.results);
      const flattedAllMovies = mappedAllMovies.flat();
      setMovies([...new Set(flattedAllMovies)]);
    };
    if (url) {
      handleFetchMovies(url, page);
    } else {
      fetchedMovies
        ? setMovies(fetchedMovies)
        : handleFetchMovies(mediaUrl, page);
    }
  }, [url, fetchedMovies, mediaTitle, mediaUrl, page]);

  return !movies ? (
    <LoadingSpinner />
  ) : (
    <div className={classes.container}>
      {movies.length === 0 && (
        <h1 className={classes["no-results"]}>No results found.</h1>
      )}
      <div className={classes.title}>
        <h2>
          {title
            ? title.concat(" ", `${handleCapitalize(media)}`)
            : mediaTitle
            ? handleCapitalize(mediaTitle).concat(" ", handleCapitalize(media))
            : " "}
        </h2>
        {isHome && (
          <Link to={`/${media}/${mediaTitle}`}>
            <button className={classes.button}>View more</button>
          </Link>
        )}
      </div>
      <div className={classes["movies-container"]}>
        {movies.slice(0, limit).map((movie) => (
          <Movie
            key={movie.id}
            id={movie.id}
            title={movie.title ? movie.title : movie.name}
            posterUrl={movie.poster_path}
            media={movie.media_type ? movie.media_type : media}
          />
        ))}
      </div>
      {!isHome && movies.length > 0 && (
        <button className={classes.button} onClick={handleLoadMore}>
          Load more...
        </button>
      )}
    </div>
  );
};

export default Movies;
