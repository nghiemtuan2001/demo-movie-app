import { useEffect, useRef, useState } from "react";
import { apiKey, baseUrl } from "../../App";
import Movies from "./Movies";
import classes from "./Search.module.css";

let timeoutId: number;

const Search: React.FC = () => {
  const [url, setUrl] = useState("");
  // const [usedUrl, setUsedUrl] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    clearTimeout(timeoutId);
    if (inputRef.current!.value.length > 0) {
      timeoutId = window.setTimeout(() => {
        console.log(123);
        setUrl(`
    ${baseUrl}/search/multi?api_key=${apiKey}&query=${
          inputRef.current!.value
        }&page=`);
      }, 500);
    } else {
      setUrl("");
    }
  };
  useEffect(() => {
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes["search-container"]}>
        <h2>Search:</h2>
        <input
          ref={inputRef}
          className={classes.search}
          type="text"
          placeholder="Enter a name..."
          onChange={handleSearch}
          autoFocus
        />
      </div>
      <div className={classes.results}>
        {url && <Movies url={url} isHome={false} />}
      </div>
    </div>
  );
};

export default Search;
