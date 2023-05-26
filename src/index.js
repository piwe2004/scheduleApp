import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import persistReducer from "./reducers";



import 'semantic-ui-css/semantic.min.css'
import './index.css';

const store = createStore(persistReducer);
const root = ReactDOM.createRoot(document.getElementById('root'));
const persistor = persistStore(store);

const render = () => root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

render()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
