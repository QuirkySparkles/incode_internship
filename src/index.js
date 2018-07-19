import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import thunkMiddleware from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import App from "./App";
import reducers from "./store/reducers";

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunkMiddleware)
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root") // eslint-disable-line no-undef
);
