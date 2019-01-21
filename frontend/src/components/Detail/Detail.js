import React, { Component } from 'react';
// import { getServiceById } from 'api';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { loadServiceById } from 'components/Detail/reducer';
import moment from 'moment';

class Detail extends Component {
    componentDidMount() {
        const id = this.props.match.params.id
        const { loadServiceById, isLoading, service } = this.props;

        if (!isLoading && service) {
            loadServiceById(id);
        }
    }

    render() {
        const { isLoading, service } = this.props;
        service.updated = moment(Date.parse(service.updated)).format('DD.MM.YYYY HH:mm')
        // console.log(moment(service.updated, 'YYYY-MM-DD'))
        return (
            <div>
                {isLoading ? <p>Загрузка</p> :
                    <div className="container detail-content_block">
                        <h1 className='mt-3'>{service.name}</h1>
                        <p className="text-muted">
                            Заказчик:
                            <Link to={`account/id/${service.customer.id}`}>
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
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return state.detail;
}

const mapDispatchToProps = {
    loadServiceById
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Detail));
