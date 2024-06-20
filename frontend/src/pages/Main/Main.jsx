import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import styles from "./Main.module.scss";
import { syncMoney } from "../../http/user";
import gameVariables from "../../consts/gameVariables";
import { setTelegramData } from "../../store/slice";

let intervals = [];
let firstSynced = false;

const Main = () => {
  const telegramData = useSelector((state) => state.telegramData);
  const [money, setMoney] = useState(0);
  const [energy, setEnergy] = useState(gameVariables.ENERGY_LIMIT);
  const dispatch = useDispatch();

  const handleTap = (e) => {
    if (energy < gameVariables.ENERGY_PER_TAP) return;
    if (e.detail === 1) syncMoneyWithServer();
    updateLocalStateOnTap();
  };

  const syncMoneyWithServer = () => {
    syncMoney(+localStorage.getItem('money'), dispatch, telegramData, setTelegramData);
  };

  const updateLocalStateOnTap = () => {
    const level = telegramData.user.level;
    const newMoney = money + gameVariables.MONEY_PER_TAP * level;
    const newEnergy = energy - gameVariables.ENERGY_PER_TAP;

    setMoney(newMoney);
    setEnergy(newEnergy);

    const localMoney = +localStorage.getItem('money');
    localStorage.setItem('money', localMoney + gameVariables.MONEY_PER_TAP * level);

    const localEnergy = +localStorage.getItem('energy');
    localStorage.setItem('energy', localEnergy - gameVariables.ENERGY_PER_TAP);
  };

  const startSync = () => {
    syncMoneyWithServer();
    setSyncIntervals();
  };

  const setSyncIntervals = () => {
    intervals.push(setInterval(syncWithServerIfNeeded, gameVariables.SYNC_INTERVAL));
    intervals.push(setInterval(recoverEnergy, gameVariables.ENERGY_RECOVERY_INTERVAL));
    intervals.push(setInterval(addPassiveIncome, 1000))
  };

  const addPassiveIncome = () => {
    setMoney((money) => {
      let newMoney = money;
      const passiveIncome = telegramData?.user?.income_per_hour_by_cards || localStorage.getItem("passive_income");
      if (passiveIncome) {
        newMoney = money + passiveIncome / 3600;
      }
      localStorage.setItem("money", newMoney);
      return newMoney;
    });
  }

  const syncWithServerIfNeeded = async () => {
    if (+localStorage.getItem('energy') < gameVariables.ENERGY_LIMIT) {
      await syncMoneyWithServer();
    }
  };

  const recoverEnergy = () => {
    setEnergy((energy) => {
      let newEnergy = energy;
      if (energy < gameVariables.ENERGY_LIMIT - gameVariables.ENERGY_RECOVERY) {
        newEnergy = energy + gameVariables.ENERGY_RECOVERY;
      } else if (energy < gameVariables.ENERGY_LIMIT) {
        newEnergy = gameVariables.ENERGY_LIMIT;
      }
      localStorage.setItem('energy', newEnergy);
      return newEnergy;
    });
  };

  useEffect(() => {
    if (telegramData?.user && !firstSynced) {
      console.log("user", telegramData.user);
      setMoney(telegramData.user.money);
      setEnergy(telegramData.user.availableTaps);
      localStorage.setItem("money", telegramData.user.money)
      localStorage.setItem("energy", telegramData.user.availableTaps)
      firstSynced = true;
    }
  }, [telegramData]);

  useEffect(() => {
    firstSynced = false;
    startSync();

    return () => {
      intervals.forEach((interval) => clearInterval(interval));
      intervals = [];
    };
  }, []);

  return (
    <div className={"page " + styles.mainPage}>
      <header>
        <p>
          Welcome to the elephant clicker, {telegramData ? telegramData?.user?.first_name : ""}!
        </p>
        <br/>
        <p>
          Your level: {telegramData?.user?.level}
        </p>
      </header>
      <div className={styles.block}>
        <button className={styles.button} onClick={handleTap}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/3/37/African_Bush_Elephant.jpg" alt="slon" width={250} />
        </button>
        <div>
          <p>Your balance</p>
          <p style={{ fontSize: 40 }}>{Math.floor(money)}</p>
          <p>dollars.</p>
        </div>
        <div>
          <p>Energy: {energy}</p>
        </div>
        <div>
          Passive income: ${(telegramData?.user?.income_per_hour_by_cards || localStorage.getItem("passive_income")) ?? 0}/h
        </div>
      </div>
    </div>
  );
};

export default Main;
