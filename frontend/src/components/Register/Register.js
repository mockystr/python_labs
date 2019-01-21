import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link, Redirect } from 'react-router-dom';
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
                <form action="" method="post">
                    <div class="form-group">
                        <label class="control-label  " for="id_username">Имя пользователя *</label>
                        <div class=" ">
                            <input onChange={this.handleInputChange} type="text" name="username" class=" form-control" maxlength="150" autofocus="" id="id_username" required="" />
                            <p class="help-block">
                                Не более 150 символов. Только буквы, цифры и символы @/./+/-/_.
                            </p>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label  " for="id_password1">Пароль *</label>
                        <div class=" ">
                            <input onChange={this.handleInputChange} type="password" name="password1" class=" form-control" id="id_password1" required="" />
                            <p class="help-block">
                            </p>
                            <ul>
                                <li>Ваш пароль должен содержать как минимум 8 символов.</li>
                                <li>Ваш пароль не может быть одним из широко распространённых паролей.</li>
                                <li>Ваш пароль не может состоять только из цифр.</li></ul>
                            <p></p>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label  " for="id_password2">Подтверждение пароля *</label>
                        <div class=" ">
                            <input onChange={this.handleInputChange} type="password" name="password2" class=" form-control" id="id_password2" required="" />
                            <p class="help-block">
                            </p>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label  " for="id_email">Почта *</label>
                        <div class=" ">
                            <input onChange={this.handleInputChange} type="email" name="email" class=" form-control" id="id_email" required="" />
                            <p class="help-block">

                            </p>
                        </div>
                    </div>
                    <p class="text-center"><button onClick={this.handleRegisterForm} type="button" class="btn btn-success">Создать аккаунт</button></p>
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
