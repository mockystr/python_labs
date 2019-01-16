import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { loadServices } from 'components/List/reducer';
import InfiniteScroll from 'react-infinite-scroll-component';

class List extends Component {
  render() {
    const { services, loadServices } = this.props;
    const { results } = services;

    console.log('services', services);

    return (
      <div className='container'>
        <InfiniteScroll
          dataLength={results.length}
          next={loadServices(services.page)}
          hasMore={services.next == null ? true : false}
          loader={<h4>Loading INFINITESCROLL</h4>}
          endMessage={<h4>end</h4>}
        >
          {services.results.map(el => {
            return (
              <div className=""
              // key={el.pk}
              >
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
        </InfiniteScroll>
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
