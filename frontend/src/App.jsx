import { useState, useEffect } from 'react'
import { validateInitData } from "./http/user";
import {Routes, Route, Link} from "react-router-dom";
import Main from "./pages/Main/Main";
import routes from "./consts/page_routes";
import {useDispatch, useSelector} from "react-redux";
import {setTelegramData, setIsAdmin} from "./store/slice";
import Footer from "./components/Footer/Footer";
import Debug from "./components/Debug/Debug";
import Mine from "./pages/Mine/Mine";
import Admin from "./pages/Admin/Admin";

function App() {
  const dispatch = useDispatch();
  const telegramData = useSelector((state) => state.telegramData);

  useEffect(() => {
    getInitData()
  }, [])

  const getInitData = async () => {
    let validatedData = await validateInitData();
    dispatch(setTelegramData(validatedData))
    dispatch(setIsAdmin(validatedData?.user?.roles.includes("ADMIN")))
  }

  return (
    <div className="App">
      {/*<Debug isVisible={true} />*/}
      <main>
        <Routes>
          <Route path={routes.MAIN} element={<Main />} />
          <Route path={routes.MINE} element={<Mine />} />
          <Route path={routes.PROFILE} element={<p>Profile here</p>}/>
          {
            telegramData?.user?.roles.includes("ADMIN") &&
            <Route path={routes.ADMIN} element={<Admin />} />
          }
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
