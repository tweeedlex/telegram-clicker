import { useState, useEffect } from 'react'
import { validateInitData } from "./http/user";
import {Routes, Route, Link} from "react-router-dom";
import Main from "./pages/Main/Main";
import routes from "./consts/pageRoutes";
import {useDispatch, useSelector} from "react-redux";
import {setTelegramData, setIsAdmin} from "./store/slice";
import Footer from "./components/Footer/Footer";
import Debug from "./components/Debug/Debug";
import Mine from "./pages/Mine/Mine";
import Admin from "./pages/Admin/Admin";
import Profile from "./pages/Profile/Profile";

function App() {
  const dispatch = useDispatch();
  const telegramData = useSelector((state) => state.telegramData);
  useEffect(() => {
    getInitData()
  }, [])

  useEffect(() => {
    console.log("useEffect", telegramData?.user?.income_per_hour_by_cards)
    if (telegramData?.user?.income_per_hour_by_cards) {
      localStorage.setItem("passive_income", telegramData.user.income_per_hour_by_cards);
    }
  }, [telegramData]);

  const resetLocalStorage = () => {
    localStorage.removeItem("money");
    localStorage.removeItem("energy");
    localStorage.removeItem("passive_income");
  }

  const getInitData = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    let validatedData = await validateInitData(urlParams.get('from'));
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
          <Route path={routes.PROFILE} element={<Profile />}/>
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
