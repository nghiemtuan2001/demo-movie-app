import classes from "./Cast.module.css";
import { baseImageUrl } from "../../App";

const Cast: React.FC<{
  name: string;
  character: string;
  imageUrl: string;
}> = ({ name, character, imageUrl }) => {
  return (
    <div className={classes.cast}>
      <img
        // src="https://image.tmdb.org/t/p/w500/sOi4UZxflV07E7QXUaJTHROGlPU.jpg"
        src={`${baseImageUrl}${imageUrl}`}
        alt={imageUrl}
      />
      <h3>{name}</h3>
      <h4>{character}</h4>
    </div>
  );
};

export default Cast;
