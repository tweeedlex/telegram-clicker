import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from "react-redux";

const Profile = () => {
	const telegramData = useSelector((state) => state.telegramData)

	const copyRefURL = () => {
		const refURL = refUrlRef.current.textContent
		const additionalText = `🔥🔥🔥 Join elephants army with my referal link and get 100k dollars on your credit card 💸💰🤑`
		navigator.clipboard.writeText(`${additionalText}\n${refURL}`);
	}

	const refUrlRef = useRef(null);

	return (
		<>
			Invite friends!
			<div>
				<p ref={refUrlRef} id="refURL">{telegramData.refURL}</p>
				<button onClick={copyRefURL} className={"button-default"}>Copy ref link</button>
			</div>
		</>
	)
}

export default Profile;