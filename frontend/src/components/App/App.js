import React, { Component, Fragment } from 'react';
import 'components/App/styles.css';
import Header from 'components/Header/Header';
import List from 'components/List/List';
import Detail from 'components/Detail/Detail';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Switch>
          <Route exact path='/' component={List} />
          <Route exact path='/:id' component={Detail} />
        </Switch>
      </Fragment>

    );
  }
}

export default App;
