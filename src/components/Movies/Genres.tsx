import classes from "./Genres.module.css";

const Genres: React.FC<{ genres: { name: string; id: number }[] }> = ({
  genres,
}) => {
  return (
    <div className={classes.genres}>
      {genres.map((genre) => (
        <span key={genre.id}>{genre.name}</span>
      ))}
    </div>
  );
};

export default Genres;
