import classes from "./MovieDetail.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseUrl, baseImageUrl, baseImageUrlOriginal, apiKey } from "../../App";
import { useUiContext } from "../../context/ui-context";
import DetailInfo from "./DetailInfo";
import Casts from "./Casts";
import LoadingSpinner from "../UI/LoadingSpinner";
import axios from "axios";

interface DetailMovie {
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
}
interface CastTypes {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}
interface DataState {
  director: { name: string };
  movieData: DetailMovie;
  casts: CastTypes[];
}

const MovieDetail: React.FC = () => {
  const { movieId, media } = useParams();
  const [data, setData] = useState<DataState>();
  const uiCtx = useUiContext();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    (async () => {
      const req1 = await axios.get(
        `${baseUrl}/${media}/${movieId}?api_key=${apiKey}`
      );
      const res1 = await req1.data;
      const req2 = await axios.get(
        `${baseUrl}/${media}/${movieId}/credits?api_key=${apiKey}`
      );
      const res2 = await req2.data;
      setData(() => {
        const movieData = res1;
        const director = res2.crew.find(
          (p: { job: string }) => p.job === "Director"
        );
        const casts = res2.cast;
        return { movieData, director, casts };
      });
    })();
  }, [movieId, media]);

  useEffect(() => {
    if (data) {
      uiCtx.setAppTitle(
        `${
          data.movieData.title ? data.movieData.title : data.movieData.name
        } - Xemphimz`
      );
    }

    return () => {
      uiCtx.setAppTitle("Xemphimz");
    };
  }, [data, uiCtx]);

  return !data ? (
    <LoadingSpinner />
  ) : (
    <>
      <div className={classes["container"]}>
        <div
          style={{
            backgroundImage: `url("${baseImageUrlOriginal}${data.movieData.backdrop_path}")`,
          }}
          className={classes.backdrop}
        ></div>
        <div className={classes["detail-container"]}>
          {data.movieData.poster_path && (
            <img
              src={`${baseImageUrl}${data.movieData?.poster_path}`}
              alt={data.movieData.original_title}
              className={classes["detail-image"]}
            />
          )}
          <DetailInfo
            title={
              data.movieData.title ? data.movieData.title : data.movieData.name
            }
            overview={data.movieData.overview}
            runtime={data.movieData.runtime}
            release_date={data.movieData.release_date}
            director={data.director?.name}
            genres={data.movieData?.genres}
            media={media}
            movieId={Number(movieId)}
            hasButton={true}
          />
        </div>
        <Casts casts={data.casts} />
      </div>
    </>
  );
};

export default MovieDetail;
