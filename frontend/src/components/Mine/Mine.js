import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { loadMineServices, createService, deleteService } from 'components/Mine/reducer';
// import InfiniteScroll from 'redux-infinite-scroll';

class Mine extends Component {
    state = {
        inputs: {
            'name': '',
            'description': '',
            'price': '',
            'photo': '',
            'active': true,
        }
    }
    componentDidMount() {
        const { mine: { isLoading, services }, token } = this.props;

        if (!isLoading && services.results.length === 0 && token) {
            const { loadMineServices } = this.props
            loadMineServices(token);
        }
    }

    handleButtonDelete = (id) => {
        const { token, deleteService } = this.props;
        deleteService(id, token);
    }

    handleFormCreate = () => {
        const { inputs: { name, description, price, photo, active } } = this.state;

        const { token, createService } = this.props;
        const fd = new FormData()

        fd.append('photo', photo, photo.name)
        createService(token, name, description, fd, price, active);
    }

    handleImageInputChange = e => {
        console.log(e.target.files[0]);
        this.setState({ inputs: { ...this.state.inputs, [e.target.name]: e.target.files[0] } })
    }

    handleCheckboxChange = e => {
        this.setState({ inputs: { ...this.state.inputs, [e.target.name]: e.target.checked } })
    }

    handleInputChange = e => {
        this.setState({ inputs: { ...this.state.inputs, [e.target.name]: e.target.value } })
    }

    render() {
        const { token } = this.props;

        if (!token) {
            return <Redirect to='/account/login/' />
        }

        const { mine: { services, isLoading } } = this.props;

        return (
            isLoading ? <h1 className='text-center mt-4'>Загрузка</h1> :
                <div className='container mt-4' >
                    <p className='text-center'>
                        <a className="btn btn-primary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                            Создать услугу
                          </a>
                    </p>
                    <div className="collapse" id="collapseExample">
                        <div className="card card-body mb-3" style={{ maxWidth: '50%', margin: '0 auto' }}>
                            <form id="create_form__form" encType="multipart/form-data">
                                <div className="form-group">
                                    <label className="control-label  " htmlFor="id_name">Название</label>
                                    <div className=" ">
                                        <input onChange={this.handleInputChange} type="text" name="name" className=" form-control" maxLength="200" id="id_name" required={true} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label  " htmlFor="id_description">Описание услуги</label>
                                    <div className=" ">
                                        <textarea onChange={this.handleInputChange} name="description" className=" form-control" rows="10" id="id_description"
                                            style={{ height: '100px' }}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label " htmlFor="id_photo">
                                        Картинка услуги
                                                </label>
                                    <div className="">
                                        <input onChange={this.handleImageInputChange} type="file" name="photo" className="" id="id_photo" accept="image/*" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label  " htmlFor="id_price">Цена услуги</label>
                                    <div className=" ">
                                        <input onChange={this.handleInputChange} type="number" name="price" step="1" className=" form-control" id="id_price" required={true} min="0" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="">
                                        <div className="checkbox">
                                            <label>
                                                <input onChange={this.handleCheckboxChange} type="checkbox" name="active" id="id_active" defaultChecked={true} /> <span>Услуга активна</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={this.handleFormCreate} type="button" className="btn btn-primary">Создать</button>
                            </form>
                        </div>
                    </div>
                    <h2 className='text-center'>МОИ УСЛУГИ</h2>
                    {services.results.length === 0 ? <p>У вас пока что нет ни одной услуги</p> :
                        services.results.map(el => {
                            return (
                                <div className="" key={el.pk}>
                                    <div className="row">
                                        <div className="col-lg-4 col-sm-6">
                                            <Link to={`/${el.pk}/`}>
                                                <img src={el.photo} alt="service_photo" className="img-thumbnail list_image" />
                                            </Link>
                                        </div>
                                        <div className="col-lg-8 col-sm-6 list_info">
                                            <Link to={`/${el.pk}/`}>{el.name} ({el.pk})</Link>
                                            <p className="text-muted">
                                                {el.customer_username}
                                            </p>
                                            <p>
                                                <button onClick={() => this.handleButtonDelete(el.pk)}>Удалить</button>
                                            </p>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            );
                        })
                    }
                </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { mine: state.mine, token: state.login.user.token };
}

const mapDispatchToProps = {
    loadMineServices, createService, deleteService
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Mine));
