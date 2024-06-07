import React from 'react';
import styles from "./Mine.module.scss";

const Mine = () => {
  return (
    <div className={"page " + styles.minePage}>
      <div className={styles.categories}>
        <button className={styles.category}>
          Category 1
        </button>
        <button className={styles.category}>
          Category 2
        </button>
        <button className={styles.category}>
          Category 3
        </button>
        <button className={styles.category}>
          Category 4
        </button>
      </div>
      <div className={styles.cards}>
        <div className={styles.card}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/3/37/African_Bush_Elephant.jpg" alt="slon"/>
          <p>
            Elephant
          </p>
          <p>
            $100
          </p>
          <p>
            +$1/s
          </p>
        </div>
        <div className={styles.card}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/3/37/African_Bush_Elephant.jpg" alt="slon"/>
          <p>
            Elephant
          </p>
          <p>
            $100
          </p>
          <p>
            +$1/s
          </p>
        </div>
      </div>
    </div>
  );
};

export default Mine;