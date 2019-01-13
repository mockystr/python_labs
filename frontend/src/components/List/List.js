import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { loadServices } from 'components/List/reducer';

class List extends Component {
  componentDidMount() {
    const { loadServices, isLoading, services } = this.props;

    if (!isLoading && services.length === 0) {
      loadServices();
    }
  }

  render() {
    const { isLoading, services } = this.props;

    return (
      <div className='container my-5'>
        {isLoading && <h2 className='text-center mt-4'>Загрузка...</h2>}
        {!isLoading &&
          services.map(el => {
            return (
              <div className="" key={el.pk}>
                <div className="row">
                  <div className="col-lg-4 col-sm-6">
                    <Link to={`/${el.pk}`}>
                      <img src={el.photo} alt="service_photo" className="img-thumbnail list_image" />
                    </Link>
                  </div>
                  <div className="col-lg-8 col-sm-6 list_info">
                    <Link to={`/${el.pk}`}>{el.name}</Link>
                    <p className="text-muted">
                      {el.customer_username}
                    </p>
                  </div>
                </div>
                <hr />
              </div>
            )
          })
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state.list;
}

const mapDispatchToProps = {
  loadServices
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List));
