import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import thunkMiddleware from "redux-thunk";
import reducers from "./reducers";

export const history = createBrowserHistory();

const store = createStore(
    connectRouter(history)(reducers),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    compose(
        applyMiddleware(
            routerMiddleware(history),
            thunkMiddleware
        ),
    ),
);

export default store;
