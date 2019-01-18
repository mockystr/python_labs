import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { load } from 'redux-localstorage-simple';

class Header extends Component {
    render() {
        const globalStore = load({ states: ['login'] })
        const { login: { user } } = globalStore;
        console.log('global store', globalStore);
        return (
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <Link className="navbar-brand" to="/">Домашная работа 2</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                            aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav ml-auto">
                                <Link className="nav-item nav-link" to='/'>Все услуги</Link>

                                {user.username ?
                                    <Fragment>
                                        <Link className="nav-item nav-link" to='/mine/'>Мои услуги</Link>
                                        <li className="nav-item dropdown">
                                            <Link className="nav-link dropdown-toggle" to="" id="navbarDropdown" role="button"
                                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                {user.username}
                                            </Link>
                                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <Link className="dropdown-item" to="account/get/">Профиль</Link>
                                                <Link className="dropdown-item" to="account/edit">Изменить</Link>
                                                <div className="dropdown-divider"></div>
                                                <Link className="dropdown-item" to='/account/logout/'>Выйти</Link>
                                            </div>
                                        </li>
                                    </Fragment> :
                                    <Link className="nav-item nav-link" to='/account/login/'>Войти</Link>
                                }
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}


export default Header;

