import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";

import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
// import { reducer } from "./reducers";

// const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(<App />, document.getElementById("root"));
