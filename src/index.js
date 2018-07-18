import React from "react";
import ReactDOM from "react-dom";
import thunkMiddleware from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import App from "./App";
import reducers from "./store/reducers";


const store = createStore(
    reducers,
    applyMiddleware(thunkMiddleware)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root") // eslint-disable-line no-undef
);
