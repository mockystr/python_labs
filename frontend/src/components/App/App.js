import React, { Component, Fragment } from 'react';
import 'components/App/styles.css';
import Header from 'components/Header/Header';
import List from 'components/List/List';
import Detail from 'components/Detail/Detail';
import Login from 'components/Login/Login';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Switch>
          <Route exact path='/' component={List} />
          <Route exact path='/:id/' component={Detail} />
          <Route exact path='/account/login/' component={Login} />
          <Route exact path='/account/logout/' component={Login} />
        </Switch>
      </Fragment>
    );
  }
}

export default App;
