import React, {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {getUserRefs} from "../../http/user";
import styles from "./Profile.module.scss";

const Profile = () => {
  const telegramData = useSelector((state) => state.telegramData)
  const [userRefs, setUserRefs] = useState([])

  const copyRefURL = () => {
    const refURL = refUrlRef.current.textContent
    const additionalText = `🔥🔥🔥 Join elephants army with my referal link and get 100k dollars on your credit card 💸💰🤑`
    navigator.clipboard.writeText(`${additionalText}\n${refURL}`);
  }

  useEffect(() => {
    getUserRefs().then(refs => setUserRefs(refs));
  }, [])

  useEffect(() => {
    console.log(userRefs)
  }, [userRefs]);

  const refUrlRef = useRef(null);

  return (
    <>
      Invite friends!
      <div>
        <p ref={refUrlRef} id="refURL">{telegramData.refURL}</p>
        <button onClick={copyRefURL} className={"button-default"}>Copy ref link</button>
        <div style={{marginTop: 20}}>

          <div className={styles.refs}>
            {userRefs.length > 0 && (
              <>
                <p>Your friends: </p>
                {userRefs.map(ref => (
                  <div key={ref._id} className={styles.ref}>
                    <p>{ref.username}</p>
                    <p>{ref.level} lvl</p>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;