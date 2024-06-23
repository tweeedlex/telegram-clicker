import React, {useEffect, useState} from 'react';
import styles from "./Earn.module.scss";
import {getIsSubscribed} from "../../http/user";

const Earn = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    getIsSubscribed().then((response) => {
      setIsSubscribed(response.isSubscribed);
    });
  });

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
          {isSubscribed ? "Done" : <a href={"https://t.me/our_slon"}>Subscribe</a>}
        </div>
      </div>
    </div>
  );
};

export default Earn;