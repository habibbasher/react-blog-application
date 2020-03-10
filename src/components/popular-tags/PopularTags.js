import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Loader from '../loader/Loader';
import ErrorMessage from '../error-message/ErrorMessage';

import useFetch from '../../custom-hooks/useFetch';

const PopularTags = () => {

  const [{ response, isLoading, error }, doFetch] = useFetch('/tags');

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  if (isLoading || !response) {
    return <Loader />;
  }

  if (!isLoading && error) {
    return <ErrorMessage />;
  }

  return (
    <div className="sidebar">
      <p>Popular tags</p>
      <div className="tag-list">
        {response.tags.map(tag => (
          <Link to={`/tags/${tag}`} key={tag} className="tag-default tag-pill">
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );

};

export default PopularTags;