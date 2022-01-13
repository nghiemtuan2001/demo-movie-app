import classes from "./Header.module.css";
import logo from "./../../assests/logo.png";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const [isColored, setIsColored] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      if (window.scrollY > 100) setIsColored(true);
      else setIsColored(false);
    });

    return () => {
      window.removeEventListener("scroll", () => null);
    };
  }, []);

  const headerClasses = isColored
    ? `${classes.header} ${classes.colored}`
    : `${classes.header}`;

  return (
    <header className={headerClasses}>
      <Link to="/">
        <img src={logo} alt="logo" className={classes.logo} />
      </Link>
      <Link to="/search" className={classes.search}>
        <SearchOutlined />
      </Link>
    </header>
  );
};

export default Header;
