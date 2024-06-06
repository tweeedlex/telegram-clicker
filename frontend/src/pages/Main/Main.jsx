import React, {useState} from 'react';
import {useSelector} from "react-redux";
import styles from "./Main.module.scss";

const Main = () => {
  const telegramData = useSelector((state) => state.telegramData);
  const [taps, setTaps] = useState(0);

  return (
    <div className={"page " + styles.mainPage}>
      <header>
        <p>
          Welcome to the elephant clicker, {telegramData ? telegramData?.user?.first_name : ""}!
        </p>
      </header>
      <div className={styles.block}>
        <button className={styles.button} onClick={() => setTaps(taps => taps + 1)}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/3/37/African_Bush_Elephant.jpg" alt="slon" width={250} />
        </button>
        <div>
          <p>
            You have clicked
          </p>
          <p style={{fontSize: 40}}>
               {taps}
          </p>
          <p>
            times.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;