import classes from "./SeasAndEps.module.css";
import { Link, useParams } from "react-router-dom";

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
interface SeasAndEpsProps {
  movieId: number;
  seasAndEpsData: seasAndEpsData[];
}

const SeasAndEps: React.FC<SeasAndEpsProps> = ({ seasAndEpsData, movieId }) => {
  const { season: currentSeason, episode: currentEpisode } = useParams();
  console.log(currentSeason, currentEpisode);

  return (
    <div className={classes["seasAndEps-container"]}>
      <div className={classes["seasons-container"]}>
        <h3>Seasons:</h3>
        <div className={classes.seasons}>
          {seasAndEpsData.map((season) => (
            <Link
              key={season.id}
              to={`/watch/tv/${movieId}/s/${season.season_number}/e/1`}
            >
              <span
                className={`${
                  season.season_number === Number(currentSeason)
                    ? classes.selected
                    : undefined
                } ${classes.span}`}
              >
                {season.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
      <div className={classes["episodes-container"]}>
        <h3>Episodes:</h3>
        <div className={classes.episodes}>
          {seasAndEpsData[Number(currentSeason) - 1].episodes.map((episode) => (
            <Link
              to={`/watch/tv/${movieId}/s/${episode.season_number}/e/${episode.episode_number}`}
              key={episode.id}
            >
              <span
                className={`${
                  episode.episode_number === Number(currentEpisode)
                    ? classes.selected
                    : undefined
                } ${classes.span}`}
              >
                {episode.episode_number}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeasAndEps;
