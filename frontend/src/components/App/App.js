import React, { Component, Fragment } from 'react';
import 'components/App/styles.css';
import Login from 'components/Login/Login';
import Register from 'components/Register/Register';
import Profile from 'components/Profile/Profile';
import Header from 'components/Header/Header';
import List from 'components/List/List';
import Detail from 'components/Detail/Detail';
import Mine from 'components/Mine/Mine';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Switch>
          <Route path='/account/register/' component={Register} />
          <Route path='/account/login/' component={Login} />
          <Route path='/account/logout/' component={Login} />
          <Route exact path='/account/username/:username/' component={Profile} />

          <Route exact path='/' component={List} />
          <Route path='/mine/' component={Mine} />
          <Route exact path='/:id/' component={Detail} />
        </Switch>
      </Fragment>
    );
  }
}

export default App;
