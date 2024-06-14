import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

const Profile = () => {
	const telegramData = useSelector((state) => state.telegramData)

	const copyRefURL = () => {
		let url = document.getElementById("refURL");
		url.select();
  		document.execCommand("copy");
	}

	return (
		<>
			Invite friends:
			<div>
				<input id="refURL" type="text" readonly="true" value={telegramData.refURL} />
				<button onClick={copyRefURL}>Copy</button>
			</div>
		</>
	)
}

export default Profile;