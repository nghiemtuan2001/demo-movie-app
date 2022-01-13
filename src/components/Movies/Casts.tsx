import Cast from "./Cast";
import classes from "./Casts.module.css";

interface CastTypes {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

const Casts: React.FC<{ casts: CastTypes[] | null }> = ({ casts }) => {
  return (
    <div className={`${classes.container} ${`scrollbar`}`}>
      <div className={classes.title}>
        <h2>Cast:</h2>
      </div>
      <div className={`${classes.casts} ${classes.scrollbar}`}>
        {casts?.map((cast) => (
          <Cast
            key={cast.id}
            name={cast.name}
            character={cast.character}
            imageUrl={cast.profile_path}
          />
        ))}
      </div>
    </div>
  );
};

export default Casts;
