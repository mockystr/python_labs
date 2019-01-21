import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { loadServices } from 'components/List/reducer';
// import InfiniteScroll from 'redux-infinite-scroll';

class List extends Component {
  componentDidMount() {
    const { isLoading, services } = this.props;

    if (!isLoading && services.results.length === 0) {
      const { loadServices } = this.props
      loadServices();
    }
  }

  render() {
    const { services, isLoading } = this.props;

    return (
      isLoading ? <h1 className='text-center mt-4'>Загрузка</h1> :
        <div className='container mt-4' >
          {services.results.map(el => {
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
  return state.list;
}

const mapDispatchToProps = {
  loadServices
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List));
