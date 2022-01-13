import classes from "./Footer.module.css";
import { FacebookOutlined, InstagramOutlined } from "@ant-design/icons";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.author}>Created By: Nghiem Anh Tuan</div>
      <div className={classes.socials}>
        <a
          href="https://www.facebook.com/seiiiiiiiii"
          target="_blank"
          rel="noreferrer"
        >
          <FacebookOutlined />
        </a>
        <a
          href="https://www.facebook.com/seiiiiiiiii"
          target="_blank"
          rel="noreferrer"
        >
          <InstagramOutlined />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
