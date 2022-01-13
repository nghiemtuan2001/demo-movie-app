import React, { useEffect, useMemo, useState } from "react";
import Movies from "./Movies/Movies";
import { baseUrl, apiKey } from "../App";
import LoadingSpinner from "./UI/LoadingSpinner";
import axios from "axios";

const Home = () => {
  const [movies, setMovies] = useState<
    { movies: any; title: string; media: string }[]
  >([]);
  const urls = useMemo(
    () => [
      {
        url: `${baseUrl}/trending/movie/week?api_key=${apiKey}&page=1`,
        title: "trending",
        media: "movie",
      },
      {
        url: `${baseUrl}/trending/tv/week?api_key=${apiKey}&page=1`,
        title: "trending",
        media: "tv",
      },
      {
        url: `${baseUrl}/movie/top_rated?api_key=${apiKey}&page=1`,
        title: "top_Rated",
        media: "movie",
      },
      {
        url: `${baseUrl}/tv/popular?api_key=${apiKey}&page=1`,
        title: "popular",
        media: "tv",
      },
    ],
    []
  );
  const handleSetTitle = (str: string) => {
    const title = str.charAt(0).toUpperCase() + str.slice(1);
    return title.replace("_", " ");
  };

  useEffect(() => {
    (async () => {
      try {
        const promises = urls.map(async (i) => {
          // const req = await fetch(i.url);
          const req = await axios.get(i.url);
          if (req.status !== 200) throw new Error("Something went wrong!");
          const res = await req.data;
          return res;
        });
        const moviesData = await axios.all(promises);
        const mappedMovies = moviesData.map((movie) => {
          const { results: moviesList } = movie;
          return moviesList;
        });
        const moviesListWithTitle = [];
        for (let i = 0; i < mappedMovies.length; i++) {
          moviesListWithTitle.push({
            movies: mappedMovies[i],
            title: urls[i].title,
            media: urls[i].media,
          });
        }
        setMovies(moviesListWithTitle);
      } catch (error: any) {
        console.log(error.message);
      }
    })();
  }, [urls]);

  return !movies ? (
    <LoadingSpinner />
  ) : (
    <>
      {movies.map((fetchedMoviesList) => (
        <Movies
          key={Math.random() * 10000}
          limit={6}
          title={handleSetTitle(fetchedMoviesList.title)}
          mediaProp={fetchedMoviesList.media}
          mediaTitleProp={fetchedMoviesList.title.toLowerCase()}
          fetchedMovies={fetchedMoviesList.movies}
          isHome={true}
        />
      ))}
    </>
  );
};

export default React.memo(Home);
