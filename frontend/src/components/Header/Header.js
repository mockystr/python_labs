import React, { Component, Fragment } from 'react';
import { NavLink, Link } from 'react-router-dom';
// import cookie from "react-cookies";
import { store } from 'index';

class Header extends Component {
    state = {
        header: {

        }
    }

    render() {
        const userData = store.getState().login;
        return (
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <NavLink className="navbar-brand" activeClassName='active' exact to="/">Домашная работа 2</NavLink>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                            aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav ml-auto">
                                <NavLink className="nav-item nav-link" activeClassName='active' exact to='/'>Все услуги</NavLink>
                                {userData.user.username ?
                                    <Fragment>
                                        <NavLink className="nav-item nav-link" to='/mine/'>Мои услуги</NavLink>
                                        <li className="nav-item dropdown">
                                            <NavLink className="nav-link dropdown-toggle" activeClassName='active' to="" id="navbarDropdown" role="button"
                                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                {userData.user.username}
                                            </NavLink>
                                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <Link className="dropdown-item" to={`/account/username/${userData.user.username}/`}>Профиль</Link>
                                                <Link className="dropdown-item" to="account/edit">Изменить</Link>
                                                <div className="dropdown-divider"></div>
                                                <Link className="dropdown-item" to='/account/logout/'>Выйти</Link>
                                            </div>
                                        </li>
                                    </Fragment> :
                                    <NavLink className="nav-item nav-link" activeClassName='active' to='/account/login/'>Войти</NavLink>
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

