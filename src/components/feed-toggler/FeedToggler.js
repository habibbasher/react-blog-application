import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AppContext } from '../../app-context';

const FeedToggler = ({ tagName }) => {

  const [currentUserState] = useContext(AppContext);
  console.log('currentUserState: ', currentUserState);

  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        {currentUserState.isLoggedIn && (
          <li className="nav-item">
            <NavLink to="/feed" className="nav-link">
              My feed
          </NavLink>
          </li>
        )}
        <li className="nav-item">
          <NavLink to="/" className="nav-link" exact>
            Global feed
          </NavLink>
        </li>
        {tagName && (
          <li className="nav-item">
            <NavLink to={`/tags/${tagName}`} className="nav-link">
              <i className="ion-pound"></i>
              {tagName}
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default FeedToggler;

