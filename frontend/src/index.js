import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App/App';
import list from 'components/List/reducer';
import detail from 'components/Detail/reducer';


import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


const appReducers = { list, detail };
const store = createStore(combineReducers(appReducers), applyMiddleware(thunk));


ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);

