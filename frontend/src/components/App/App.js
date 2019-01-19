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
          <Route path='/account/login/' component={Login} />
          <Route path='/account/logout/' component={Login} />
          
          <Route exact path='/' component={List} />
          <Route path='/mine/' component={List} />
          <Route path='/:id/' component={Detail} />
        </Switch>
      </Fragment>
    );
  }
}

export default App;
