import React from 'react';
import ReactDOM from 'react-dom/client';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './App';
import rootReducer from './reducers';
import 'semantic-ui-css/semantic.min.css'
import './index.css';

const enhancer = 
    process.env.NODE_ENV === "producetion"
        ? compose(applyMiddleware())
        :composeWithDevTools(applyMiddleware(logger));

const store = createStore(rootReducer, enhancer);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
