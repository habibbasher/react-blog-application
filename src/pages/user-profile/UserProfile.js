import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import useFetch from '../../custom-hooks/useFetch';

const UserProfile = ({ match }) => {

  const slug = match.params.slug;
  const userProfileURI = `/profiles/${slug}`;

  const [{ response }, doFetchUserProfile] = useFetch(userProfileURI);

  useEffect(() => {
    doFetchUserProfile();
  }, []);

  if (!response) return null;


  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img className="user-img" src={response.profile.image} alt="User img" />
              <h4>{response.profile.username}</h4>
              <p>{response.profile.bio}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="article-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <NavLink exact to={`/profiles/${response.profile.username}`} className="nav-link">
                    My Posts
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={`/profiles/${response.profile.username}/favorites`} className="nav-link">
                    Favorites posts
                  </NavLink>
                </li>
              </ul>
            </div>
            UserArticles
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;