import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import AuthPage from './pages/Auth';
import BookingsPage from './pages/Bookings';
import TalesPage from './pages/Tales';
import MainNavigation from './components/Navigation/MainNavigation';
import { AuthProvider } from './context/auth-context';

import './App.css';

class App extends Component {
  state = {
    token: null,
    userId: null
  };

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthProvider>
            <MainNavigation />
            <main className="main-content">
              <Switch>
                {this.state.token && <Redirect from="/" to="/tales" exact />}
                {this.state.token && (
                  <Redirect from="/auth" to="/tales" exact />
                )}
                {!this.state.token && (
                  <Route path="/auth" component={AuthPage} />
                )}
                <Route path="/tales" component={TalesPage} />
                {this.state.token && (
                  <Route path="/bookings" component={BookingsPage} />
                )}
                {!this.state.token && <Redirect to="/auth" exact />}
              </Switch>
            </main>
          </AuthProvider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
