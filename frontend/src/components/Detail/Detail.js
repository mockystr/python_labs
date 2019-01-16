import React, { Component } from 'react';
// import { getServiceById } from 'api';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { loadServiceById } from 'components/Detail/reducer';

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
        console.log(service);
        return (
            <div>
                {isLoading &&
                    <p>Загрузка</p>
                }
                {!isLoading &&
                    <div class="container detail-content_block">
                        <h1>{service.name}</h1>
                        <p class="text-muted">
                            Заказчик:
                            <Link to={`account/id/`}>
                                {/* {service.customer.username} */}
                            </Link>.
                            Последнее изменение: {service.updated}
                        </p>
                        <div class="row mt-3">
                            <div class="col-lg-6">
                                <img src={service.photo} alt="" style={{ width: '100%' }} />
                            </div>
                            <div class="col-lg-6">
                                <h3 class="mt-0 mt-xs-5 ">Цена услуги:</h3>
                                <p>{service.price}</p>

                                <h3 class="mt-0 mt-xs-5 ">Описание услуги:</h3>
                                <p>{service.description}</p>
                            </div>
                        </div>
                        <div class="customers_list mt-3">
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
