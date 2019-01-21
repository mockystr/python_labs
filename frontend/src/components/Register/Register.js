import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { registerUser } from 'components/Register/reducer';

class Register extends Component {
    state = {
        inputs: {
            username: '',
            password1: '',
            password2: '',
            email: '',
        },
        userCreated: false
    }

    handleInputChange = (e) => {
        this.setState({ inputs: { ...this.state.inputs, [e.target.name]: e.target.value } });
    }

    handleRegisterForm = () => {
        const { registerUser } = this.props;
        const { inputs: { username, password1, password2, email } } = this.state;

        registerUser(username, password1, password2, email);
        this.setState({ userCreated: true })
    }

    render() {
        const { userCreated } = this.state;

        if (userCreated) {
            this.setState({ userCreated: false })
            return <Redirect to='/account/login/' />
        }
        return (
            <div className='container mt-5 module-container'>
                <h2 className='text-center'>Регистрация</h2>
                <form>
                    <div className="form-group">
                        <label className="control-label  " htmlFor="id_username">Имя пользователя *</label>
                        <div className=" ">
                            <input onChange={this.handleInputChange} type="text" name="username" className=" form-control" maxLength="150" autoFocus="" id="id_username" required={true} />
                            <p className="help-block">
                                Не более 150 символов. Только буквы, цифры и символы @/./+/-/_.
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label  " htmlFor="id_password1">Пароль *</label>
                        <div className=" ">
                            <input onChange={this.handleInputChange} type="password" name="password1" className=" form-control" id="id_password1" required={true} />
                            <p className="help-block"></p>
                            <ul>
                                <li>Ваш пароль должен содержать как минимум 8 символов.</li>
                                <li>Ваш пароль не может быть одним из широко распространённых паролей.</li>
                                <li>Ваш пароль не может состоять только из цифр.</li></ul>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label  " htmlFor="id_password2">Подтверждение пароля *</label>
                        <div className=" ">
                            <input onChange={this.handleInputChange} type="password" name="password2" className=" form-control" id="id_password2" required={true} />
                            <p className="help-block">
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label  " htmlFor="id_email">Почта *</label>
                        <div className=" ">
                            <input onChange={this.handleInputChange} type="email" name="email" className=" form-control" id="id_email" required={true} />
                            <p className="help-block"></p>
                        </div>
                    </div>
                    <p className="text-center"><button onClick={this.handleRegisterForm} type="button" className="btn btn-success">Создать аккаунт</button></p>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { register: state.register, token: state.login.token };
}

const mapDispatchToProps = {
    registerUser,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));
