import React, { useEffect, Fragment } from 'react';
import { stringify } from 'query-string';

import Feed from '../../components/feed/Feed';
import Pagination from '../../components/pagination/Pagination';
import PopularTags from '../../components/popular-tags/PopularTags';
import Loader from '../../components/loader/Loader';
import ErrorMessage from '../../components/error-message/ErrorMessage';
import FeedToggler from '../../components/feed-toggler/FeedToggler';
import Banner from '../../components/banner/Banner';

import { getPaginator, limit } from '../../utils';

import useFetch from '../../custom-hooks/useFetch';

const MyFeed = ({ location, match }) => {

  const { offset, currentPage } = getPaginator(location.search);
  const stringifiedParams = stringify({
    limit,
    offset
  });

  const currentURL = match.url;

  const articleURI = `/articles/feed?${stringifiedParams}`;

  const [{ response, error, isLoading }, doFetch] = useFetch(articleURI);

  useEffect(() => {
    doFetch();
  }, [currentPage, doFetch]);

  return (
    <div className="home-page">
      <Banner />
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggler />
            {
              isLoading && <Loader />
            }
            {error && <ErrorMessage />}
            {!isLoading && response && (
              <Fragment>
                <Feed articles={response.articles} />
                <Pagination total={response.articlesCount} limit={limit} url={currentURL} currentPage={currentPage} />
              </Fragment>
            )}
          </div>
          <div className="col-md-3">
            <PopularTags />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyFeed;