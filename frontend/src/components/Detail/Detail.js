import React, { Component } from 'react';
// import { getServiceById } from 'api';
import { connect } from 'react-redux';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { loadServiceById, addToBids } from 'components/Detail/reducer';
import moment from 'moment';
import _ from 'lodash';


class Detail extends Component {
    constructor(props) {
        super(props);

        const id = props.match.params.id
        const { loadServiceById, detail: { isLoading } } = props;

        if (!isLoading) {
            loadServiceById(id);
        }
    }

    handleActivityButton = () => {
        const id = this.props.match.params.id
        const { addToBids, login: { user: { token } } } = this.props;

        addToBids(id, token);
        return <Redirect push to={`/${id}`} />
    }

    render() {
        const { detail: { isLoading, service }, login } = this.props;
        service.updated = moment(Date.parse(service.updated)).format('DD.MM.YYYY HH:mm')

        return (
            <div className='container'>
                {isLoading ? <p>Загрузка</p> :
                    <div className=" detail-content_block">
                        <h1 className='mt-3'>{service.name}</h1>
                        <p className="text-muted">
                            Заказчик: <Link to={`/account/username/${service.customer.username}`}>
                                {service.customer.username}
                            </Link>.
                            Последнее изменение: {service.updated}
                        </p>
                        <div className="row mt-3">
                            <div className="col-lg-6">
                                <img src={service.photo} alt="" style={{ width: '100%' }} />
                            </div>
                            <div className="col-lg-6">
                                <h3 className="mt-0 mt-xs-5 ">Цена услуги:</h3>
                                <p>{service.price}</p>

                                <h3 className="mt-0 mt-xs-5 ">Описание услуги:</h3>
                                <p>{service.description}</p>
                            </div>
                        </div>
                        <div className="customers_list mt-3">
                        </div>
                    </div>
                }
                <div>
                    {login.user.token ?
                        service.customer.username === login.user.username ?
                            <div>
                                <h2>Список откликнушихся на вашу услугу:</h2>
                                <ul>
                                    {service.bids.map(el =>
                                        <li key={el.user.id}>
                                            {el.user.username}
                                        </li>
                                    )}
                                </ul>
                            </div>
                            : _.map(service.bids, 'user.username').includes(login.user.username) ?
                                <h2 className='text-center my-4'>Вы уже откликнулись на услугу</h2> :
                                <p className='text-center my-4'>
                                    <button onClick={this.handleActivityButton} type='button' className='btn btn-outline-success'>Откликнуться</button>
                                </p>
                        :
                        <div className='text-center my-4'>
                            <Link to='/account/login/'>Авторизируйтесь, чтобы откликнуться</Link>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { detail: state.detail, login: state.login };
}

const mapDispatchToProps = {
    loadServiceById, addToBids
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Detail));
