import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

const Profile = () => {
	const telegramData = useSelector((state) => state.telegramData)
	const urlInput = document.getElementById("refURL");

	const copyRefURL = () => {
		if (urlInput){
			urlInput.select();
	  		document.execCommand("copy");
  		}
	}

	useEffect(() => {
		if (urlInput){
    		urlInput.value = telegramData.refURL;
		}
  	}, [telegramData])

	return (
		<>
			Invite friends:
			<div>
				<input id="refURL" type="text" readOnly="true" value={telegramData.refURL} />
				<button onClick={copyRefURL}>Copy</button>
			</div>
		</>
	)
}

export default Profile;