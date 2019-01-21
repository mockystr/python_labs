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
        // this.setState({ inputs: {} })
        // this.setState({ loadedService: true });

        // window.location.reload()
        // return <Redirect to='/' />
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
                    <div className="create_service">
                        <div className="create_service__firstbutton">
                            <button type="button" id='create_service__button' className="btn btn-primary" data-toggle="modal"
                                data-target="#exampleModal">
                                Добавить услугу
                            </button>
                        </div>
                        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                            aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Добавление услуги</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <form onSubmit={this.handleFormCreate} id="create_form__form" encType="multipart/form-data">
                                        <div className="modal-body">
                                            <div className="form-group">
                                                <label className="control-label  " htmlFor="id_name">Название</label>
                                                <div className=" ">
                                                    <input onChange={this.handleInputChange} type="text" name="name" className=" form-control" maxLength="200" id="id_name" required={true} />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label  " htmlFor="id_description">Описание услуги</label>
                                                <div className=" ">
                                                    <textarea onChange={this.handleInputChange} name="description" className=" form-control" rows="10" id="id_description" cols="40"></textarea>
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
                                        </div>
                                        <div className="modal-footer">
                                            <button onClick={this.handleFormCreate} type="button" className="btn btn-primary">Создать</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
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
