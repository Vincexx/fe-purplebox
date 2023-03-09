import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store";
import { HashRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
const status = process.env.REACT_APP_API_URL === "development";

root.render(
  // <React.StrictMode>
  //   <HashRouter>
  //     <Provider store={store}>
  //       <App />
  //     </Provider>
  //   </HashRouter>
  // </React.StrictMode>
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
);

reportWebVitals();
