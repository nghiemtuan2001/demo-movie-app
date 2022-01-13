import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiKey, baseMovieUrl, baseTvUrl, baseUrl } from "../../App";
import classes from "./WatchMovie.module.css";
import DetailInfo from "./DetailInfo";
import SeasAndEps from "./SeasAndEps";

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
interface seasAndEpsData {
  id: number;
  season_number: number;
  name?: string;
  episodes: {
    id: number;
    season_number: number;
    episode_number: number;
  }[];
}
interface CurrentSsAndEpsState {
  tvId: number | null;
  seasonNumber: number | null;
  seasAndEpsData?: seasAndEpsData[] | null;
  movieOrTvInfo?: DetailInfoProps | null;
}

const WatchMovie: React.FC = () => {
  const { movieId, media, season, episode } = useParams();
  const [currentSsAndEps, setcurrentSsAndEps] = useState<CurrentSsAndEpsState>({
    tvId: null,
    seasonNumber: null,
    seasAndEpsData: null,
    movieOrTvInfo: null,
  });

  useEffect(() => {
    const fetchMovie = async (url: string) => {
      const req = await fetch(url);
      const res = await req.json();
      setcurrentSsAndEps((state) => {
        return { ...state, movieOrTvInfo: res };
      });
      if (media === "tv") {
        const seasonsNumber = res.number_of_seasons;
        const promises = [];
        for (let i = 1; i <= seasonsNumber; i++) {
          const reqSeasons = await fetch(
            `${baseUrl}/${media}/${movieId}/season/${i}?api_key=${apiKey}`
          );
          const resSeasons = await reqSeasons.json();
          promises.push(resSeasons);
        }
        const fetchedPromises = await Promise.all(promises);
        setcurrentSsAndEps((state) => {
          return {
            ...state,
            tvId: res.id,
            seasonNumber: 1,
            seasAndEpsData: fetchedPromises,
            movieOrTvInfo: res,
          };
        });
      }
    };
    fetchMovie(`${baseUrl}/${media}/${movieId}?api_key=${apiKey}`);
  }, [media, movieId]);

  return (
    <>
      <div className={classes.container}>
        <div className={classes["player-container"]}>
          <iframe
            className={classes.player}
            src={
              (media === "movie"
                ? `${baseMovieUrl}${movieId}`
                : currentSsAndEps.tvId &&
                  `${baseTvUrl}${currentSsAndEps.tvId}&s=${season}&e=${episode}`) ||
              ""
            }
            title="Movie player"
            frameBorder="0"
            allowFullScreen={true}
          ></iframe>
        </div>
        {currentSsAndEps.seasAndEpsData && (
          <SeasAndEps
            movieId={Number(movieId)}
            seasAndEpsData={currentSsAndEps.seasAndEpsData}
          />
        )}
      </div>
      <div className={classes.detail}>
        {currentSsAndEps.movieOrTvInfo && (
          <DetailInfo
            title={
              currentSsAndEps.movieOrTvInfo.title
                ? currentSsAndEps.movieOrTvInfo.title
                : currentSsAndEps.movieOrTvInfo.name
            }
            overview={currentSsAndEps.movieOrTvInfo.overview}
            runtime={currentSsAndEps.movieOrTvInfo.runtime}
            release_date={currentSsAndEps.movieOrTvInfo.release_date}
            genres={currentSsAndEps.movieOrTvInfo.genres}
            media={media}
            movieId={Number(movieId)}
          />
        )}
      </div>
    </>
  );
};

export default WatchMovie;
