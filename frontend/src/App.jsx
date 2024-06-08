import { useState, useEffect } from 'react'
import { validateInitData } from "./http/user";
import {Routes, Route, Link} from "react-router-dom";
import Main from "./pages/Main/Main";
import routes from "./consts/page_routes";
import { useDispatch } from "react-redux";
import {setTelegramData} from "./store/slice";
import Footer from "./components/Footer/Footer";
import Debug from "./components/Debug/Debug";
import Mine from "./pages/Mine/Mine";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    getInitData()
  }, [])

  const getInitData = async () => {
    let validatedData = await validateInitData();
    dispatch(setTelegramData(validatedData))
  }

  return (
    <div className="App">
      <Debug />
      <main>
        <Routes>
          <Route path={routes.MAIN} element={<Main />} />
          <Route path={routes.MINE} element={<Mine />} />
          <Route path={routes.PROFILE} element={<p>Profile here</p>}/>
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
