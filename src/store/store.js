import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import thunkMiddleware from "redux-thunk";
import reducers from "./reducers";

export const history = createBrowserHistory();

const store = createStore(
    connectRouter(history)(reducers),
    compose(
        applyMiddleware(
            routerMiddleware(history),
            thunkMiddleware
        ),
    ),
);

export default store;
