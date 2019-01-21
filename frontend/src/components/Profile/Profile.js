import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadProfile } from 'components/Profile/reducer';

class Profile extends Component {
    componentDidMount() {
        const username = this.props.match.params.username
        const { loadProfile, isLoading, user } = this.props;

        if (!isLoading && user) {
            loadProfile(username);
        }
    }

    render() {
        const { isLoading, user } = this.props;

        return (
            isLoading ? <h1 className='text-center mt-3'>Загрузка</h1> :
                <div className="container" >
                    <div className="row my-3">
                        <div className="col-lg-6">
                            <img className="img-thumbnail" src={user.photo} alt="Аватарка" />
                        </div>
                        <div className="col-lg-6">
                            {user.first_name && user.last_name ?
                                <h2>{user.first_name} {user.last_name}</h2> :
                                <h2>Имя и фамилия не указаны</h2>
                            }
                            {user.status ?
                                <p>Статус</p> : <span className="" style={{ color: 'green' }}>{user.status}</span>
                            }
                            <p className="text-muted">username: {user.username}</p>
                            {user.email ?
                                <p>{user.email}</p> :
                                <p>email не указан</p>
                            }
                            {user.date_of_birth ?
                                <p>Дата рождения: {user.date_of_birth}</p> :
                                <p>Дата рождения не указана</p>
                            }
                        </div>
                    </div>
                </div >
        );
    }
}

const mapStateToProps = (state) => {
    return state.profile;
}

const mapDispatchToProps = {
    loadProfile
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
