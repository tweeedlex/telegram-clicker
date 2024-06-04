import { useState, useEffect } from 'react'
import { validateUser } from "./http/user";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main/Main";
import routes from "./consts/page_routes";
import { useDispatch } from "react-redux";
import {setTelegramData} from "./store/slice";

function App() {
  const webApp = window.Telegram.WebApp
  const initData = webApp.initData
  const dispatch = useDispatch();

  useEffect(() => {
    validateInitData()
  }, [])

  const validateInitData = async () => {
    let validatedData = await validateUser(initData);
    validatedData = window.Telegram.Utils.urlParseQueryString(validatedData);
    validatedData.user = JSON.parse(validatedData.user)
    dispatch(setTelegramData(validatedData))
  }

  return (
    <div className="App">
      <Routes>
        <Route path={routes.MAIN} element={<Main />} />
      </Routes>
    </div>
  )
}

export default App
