import { useState, useEffect } from 'react'
import { validateInitData } from "./http/user";
import {Routes, Route, Link} from "react-router-dom";
import Main from "./pages/Main/Main";
import routes from "./consts/page_routes";
import { useDispatch } from "react-redux";
import {setTelegramData} from "./store/slice";
import Footer from "./components/Footer/Footer";

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
      <main>
        <Routes>
          <Route path={routes.MAIN} element={<Main />} />
          <Route path={routes.MINE} element={<p>Mining cards here</p>} />
          <Route path={routes.PROFILE} element={<p>Profile here</p>}/>
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
