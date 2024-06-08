import React from 'react'
import './index.scss'
import App from './App'
import {BrowserRouter} from "react-router-dom";
import store from './store/config'
import {Provider} from "react-redux";
import {createRoot} from "react-dom/client";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";

const container = document.getElementById('root')
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <DevSupport ComponentPreviews={ComponentPreviews}
                  useInitialHook={useInitial}
      >
        <App/>
      </DevSupport>
    </BrowserRouter>
  </Provider>
)
