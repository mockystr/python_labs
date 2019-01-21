import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App/App';
import list from 'components/List/reducer';
import mine from 'components/Mine/reducer';
import detail from 'components/Detail/reducer';
import login from 'components/Login/reducer';
import register from 'components/Register/reducer';
import profile from 'components/Profile/reducer';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { save } from 'redux-localstorage-simple';

const appReducers = { list, detail, mine, login, register, profile };
export const store = createStore(combineReducers(appReducers),
    composeWithDevTools(applyMiddleware(save({ states: ['login'] }), thunk)));


ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);

