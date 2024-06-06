import React from 'react';
import {Link} from "react-router-dom";
import routes from "../../consts/page_routes";
import styles from "./Footer.module.scss";
import mainIcon from "../../img/footer/main.png"
import mineIcon from "../../img/footer/mine.png"
import profileIcon from "../../img/footer/profile.png"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <nav>
        <ul>
          <li>
            <Link to={routes.MAIN}>
              <img width={42} src={mainIcon}/>
            </Link>
          </li>
          <li>
            <Link to={routes.MINE}>
              <img width={42} src={mineIcon}/>
            </Link>
          </li>
          <li>
            <Link to={routes.PROFILE}>
              <img width={42} src={profileIcon}/>
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;