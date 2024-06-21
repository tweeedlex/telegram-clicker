import React from 'react';
import styles from "./Earn.module.scss";

const Earn = () => {
  return (
    <div className={"page " + styles.earnPage}>
      <p>Earn more money by doing tasks</p>
      <div className={styles.tasks}>
        <div className={styles.task}>
          <img src={"https://cdn-icons-png.flaticon.com/512/5968/5968804.png"} width={48} />
          <div>
            <p>Subscribe to our telegram channel</p>
            <p>Reward: 5000$</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Earn;