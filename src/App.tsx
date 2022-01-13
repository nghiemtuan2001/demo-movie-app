import { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useUiContext } from "./context/ui-context";
import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import NotFound from "./components/UI/NotFound";
import Search from "./components/Movies/Search";
// import Home from "./components/Home";
// import Movies from "./components/Movies/Movies";
// import MovieDetail from "./components/Movies/MovieDetail";
// import WatchMovie from "./components/Movies/WatchMovie";
const Home = lazy(() => import("./components/Home"));
const Movies = lazy(() => import("./components/Movies/Movies"));
const MovieDetail = lazy(() => import("./components/Movies/MovieDetail"));
const WatchMovie = lazy(() => import("./components/Movies/WatchMovie"));

const App = () => {
  const uiCtx = useUiContext();
  useEffect(() => {
    document.title = uiCtx.appTitle;
  }, [uiCtx]);
  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:media/:movieId" element={<MovieDetail />} />
          <Route path="/:media/:mediaTitle" element={<Movies />} />
          <Route path="/watch/:media/:movieId" element={<WatchMovie />} />
          <Route
            path="/watch/:media/:movieId/s/:season/e/:episode"
            element={<WatchMovie />}
          />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default App;
export const apiKey = process.env.REACT_APP_API_KEY;
export const baseMovieUrl = process.env.REACT_APP_BASE_MOVIE_URL;
export const baseTvUrl = process.env.REACT_APP_BASE_TV_URL;
export const baseUrl = process.env.REACT_APP_BASE_URL;
export const baseImageUrl = process.env.REACT_APP_BASE_IMAGE_URL;
export const baseImageUrlOriginal =
  process.env.REACT_APP_BASE_IMAGE_URL_ORIGINAL;
