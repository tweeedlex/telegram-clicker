import { useState, useEffect } from 'react'
import { validateUser } from "./http/user";

function App() {
  const webApp = window.Telegram.WebApp
  const initData = webApp.initData
  const [validatedInitData, setValidatedInitData] = useState({})

  useEffect(() => {
    validateInitData()
  }, [])

  const validateInitData = async () => {
    let validatedData = await validateUser(initData);
    validatedData = window.Telegram.Utils.urlParseQueryString(validatedData);
    validatedData.user = JSON.parse(validatedData.user)
    setValidatedInitData(validatedData);
  }

  return (
    <div className="App">
      <header>
        <p>
          Welcome to the elephant clicker!
        </p>
      </header>
      <main>
        <button>
            Click me!
        </button>
        <p>
            You have clicked 0 times.
        </p>
          {JSON.stringify(validatedInitData.user, null, 2)}
      </main>
    </div>
  )
}

export default App
