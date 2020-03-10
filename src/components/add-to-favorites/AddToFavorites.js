import React from 'react';

import classNames from 'classnames';

import useFetch from '../../custom-hooks/useFetch';

const AddToFavorites = ({ isFavorited, favoritesCount, articleSlug }) => {

  const favoriteURI = `/articles/${articleSlug}/favorite`;

  const [{ response }, doFetchFavorite] = useFetch(favoriteURI);

  const isFavoritedWithResponse = response ? response.article.favorited : isFavorited;

  const favoritesCountWithResponse = response ? response.article.favoritesCount : favoritesCount;

  const buttonClasses = classNames({
    'btn': true,
    'btn-sm': true,
    'btn-primary': isFavoritedWithResponse,
    'btn-outline-primary': !isFavoritedWithResponse
  });

  const handleOnClick = event => {
    event.preventDefault();
    doFetchFavorite({
      method: isFavoritedWithResponse ? 'delete' : 'post'
    });
  };

  return (
    <button className={buttonClasses} onClick={handleOnClick}>
      <i className="ion-heart"></i>
      <span>&nbsp; {favoritesCountWithResponse}</span>
    </button>
  );
};

export default AddToFavorites;