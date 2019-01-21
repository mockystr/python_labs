import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { loginUser, logoutUser } from 'components/Login/reducer';
import 'components/Login/styles.css';


class Login extends Component {
    constructor(props) {
        super(props);

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

    handleLoginForm = () => {
        const { loginUser } = this.props;
        const { usernameInput, passwordInput } = this.state;

        loginUser(usernameInput, passwordInput);
    }

    render() {
        const { logoutUser, match: { path } } = this.props;

        console.log('path temp', path);

        if (path === '/account/logout/') {
            logoutUser();
            return <Redirect to='/account/login/' />;
        }

        const { user } = this.props;
        console.log('USER', user);

        return (
            <div className='container mt-5 module-container'>
                <h2 className='text-center'>Логин</h2>
                <form>
                    <div className="form-group">
                        <label className="control-label  " htmlFor="id_username">Имя пользователя</label>
                        <div className=" ">
                            <input type="text" name="username" className=" form-control" autoFocus="" id="id_username" required={true}
                                onChange={this.handleUsernameInputChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="control-label  " htmlFor="id_password">Пароль</label>
                        <div className=" ">
                            <input type="password" name="password" className=" form-control" id="id_password" required={true}
                                onChange={this.handlePasswordInputChange} />
                        </div>
                    </div>

                    <button onClick={this.handleLoginForm} type='button' className="btn btn-outline-primary">Подтвердить</button>
                    <Link to="/account/register/" className="btn btn-outline-info" style={{ float: 'right' }}>
                        Зарегистрироваться
                    </Link>
                </form>
                {user.username && user.token && <Redirect to='/' />}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state.login;
}

const mapDispatchToProps = {
    loginUser,
    logoutUser,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
