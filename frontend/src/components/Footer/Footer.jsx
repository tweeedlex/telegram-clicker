import React from 'react';
import {Link} from "react-router-dom";
import routes from "../../consts/page_routes";
import styles from "./Footer.module.scss";
import mainIcon from "../../img/footer/main.png"
import mineIcon from "../../img/footer/mine.png"
import profileIcon from "../../img/footer/profile.png"
import adminIcon from "../../img/footer/admin.jpg"
import {useSelector} from "react-redux";

const Footer = () => {
  const telegramData = useSelector((state) => state.telegramData);

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
          {
            telegramData?.user?.roles.includes("ADMIN") &&
            <li>
              <Link to={routes.ADMIN}>
                <img width={42} src={adminIcon}/>
              </Link>
            </li>
          }
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;