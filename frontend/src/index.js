import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App/App';
import list from 'components/List/reducer';
import detail from 'components/Detail/reducer';
import login from 'components/Login/reducer';


import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { save } from 'redux-localstorage-simple';

const appReducers = { list, detail, login };
export const store = createStore(combineReducers(appReducers),
    composeWithDevTools(applyMiddleware(save({namespace:'serviceApp'}),thunk)));


ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);

