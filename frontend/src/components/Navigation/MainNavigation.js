import React from 'react';
import { NavLink } from 'react-router-dom';
import { Typography } from "@material-ui/core";
import { AuthProvider, useAuthContext } from '../../context/auth-context';
import './MainNavigation.css';

const mainNavigation = props => {
  const context = useAuthContext()

  return (
    <header className="main-navigation">
      <div className="main-navigation__logo">
        <Typography variant="h1" >
          Talesorstory
        </Typography>
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
          {context && context.token && (
            <React.Fragment>
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
