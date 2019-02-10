import React from "react";
import ReactDOM from "react-dom";
import {hashHistory, Router} from "react-router";
import {routerMiddleware, syncHistoryWithStore} from "react-router-redux";
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import reducers from "./reducers";
import thunk from "redux-thunk";
import routes from "./routes";
import "./components/theme/base.css";
import "./components/theme/common.css";

const store = createStore(
    reducers,
    applyMiddleware(thunk),
    applyMiddleware(routerMiddleware(hashHistory))
);

const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
    <Provider store={ store }>
        <Router routes={routes} history={history}/>
    </Provider>,
    document.getElementById('app')
);
