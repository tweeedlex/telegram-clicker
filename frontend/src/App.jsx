import { useState, useEffect } from 'react'
import { validateInitData } from "./http/user";
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
    getInitData()
  }, [])

  const getInitData = async () => {
    let validatedData = await validateInitData(initData);
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
