import React from 'react';
import { NavLink } from 'react-router-dom';

import { AuthProvider, useAuthContext } from '../../context/auth-context';
import './MainNavigation.css';

const mainNavigation = props => {
  const context = useAuthContext()

  return (
    <header className="main-navigation">
      <div className="main-navigation__logo">
        <h1>EasyTale</h1>
      </div>
      <nav className="main-navigation__items">
        <ul>
          {context && !context.token && (
            <li>
              <NavLink to="/auth">Authenticate</NavLink>
            </li>
          )}
          <li>
            <NavLink to="/tales">Tales</NavLink>
          </li>
          {context &&  context.token && (
            <React.Fragment>
              <li>
                <NavLink to="/bookings">Bookings</NavLink>
              </li>
              <li>
                <button onClick={context.logout}>Logout</button>
              </li>
            </React.Fragment>
          )}
        </ul>
      </nav>
    </header>
  )

}

export default mainNavigation;
