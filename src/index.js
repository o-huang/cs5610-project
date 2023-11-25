import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import $ from "jquery";
import store from "./Components/store";
import { Provider } from "react-redux";

window.jQuery = $;
window.$ = $;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
);
