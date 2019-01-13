import React, { Component } from 'react';
import { getServiceById } from 'api';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { loadServiceById } from 'components/Detail/reducer';

class Detail extends Component {
    componentDidMount() {
        // console.log(this.props.match.params.id)
    }

    render() {
        return (
            <div></div>
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
