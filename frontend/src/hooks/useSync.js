import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import gameVariables from "../consts/gameVariables";
import {syncMoney} from "../http/user";
import {setTelegramData} from "../store/slice";

const useSync = (telegramData, energy, setEnergy) => {
  const dispatch = useDispatch();
  const intervals = [];

  useEffect(() => {
    const syncInterval = setInterval(async () => {
      if (+localStorage.getItem("energy") < gameVariables.ENERGY_LIMIT) {
        await syncMoney(+localStorage.getItem("money"), dispatch, telegramData, setTelegramData);
      }
    }, gameVariables.SYNC_INTERVAL);

    const energyRecoveryInterval = setInterval(() => {
      setEnergy((energy) => {
        let newEnergy = energy + gameVariables.ENERGY_RECOVERY;
        if (newEnergy > gameVariables.ENERGY_LIMIT) {
          newEnergy = gameVariables.ENERGY_LIMIT;
        }
        localStorage.setItem("energy", newEnergy);
        return newEnergy;
      });
    }, gameVariables.ENERGY_RECOVERY_INTERVAL);

    intervals.push(syncInterval, energyRecoveryInterval);

    return () => {
      intervals.forEach(interval => clearInterval(interval));
    };
  }, [dispatch, telegramData, setEnergy]);
};

export default useSync;
