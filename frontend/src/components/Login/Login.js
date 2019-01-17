import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { loginUser } from 'components/Login/reducer';
import 'components/Login/styles.css';
import {login} from 'api'
class Login extends Component {
    constructor(props) {
        super(props);
        login('mockingbird', 'qwerty123');

        this.handleUsernameInputChange = this.handleUsernameInputChange.bind(this)
        this.handlePasswordInputChange = this.handlePasswordInputChange.bind(this)
    }

    state = {
        usernameInput: '',
        passwordInput: '',
    }

    handleUsernameInputChange({ target: { value } }) {
        this.setState({ usernameInput: value });
    }

    handlePasswordInputChange({ target: { value } }) {
        this.setState({ passwordInput: value });
    }

    handleLoginForm = (e) => {
        e.preventDefault();
        const { loginUser } = this.props;
        const { usernameInput, passwordInput } = this.state;

        loginUser(usernameInput, passwordInput);
    }

    render() {
        return (
            <div className='container mt-5 module-container'>
                <h2 className='text-center'>Логин</h2>

                <form onSubmit={this.handleLoginForm}>
                    <div className="form-group">
                        <label className="control-label  " htmlFor="id_username">Имя пользователя</label>
                        <div className=" ">
                            <input type="text" name="username" className=" form-control" autoFocus="" id="id_username" required=""
                                onChange={this.handleUsernameInputChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="control-label  " htmlFor="id_password">Пароль</label>
                        <div className=" ">
                            <input type="password" name="password" className=" form-control" id="id_password" required=""
                                onChange={this.handlePasswordInputChange} />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-outline-primary">Подтвердить</button>
                    <Link to="/account/register/" className="btn btn-outline-info" style={{ float: 'right' }}>
                        Зарегистрироваться
                    </Link>
                </form>
            </div>)
    }
}

const mapStateToProps = (state) => {
    return state.login;
}

const mapDispatchToProps = {
    loginUser
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
