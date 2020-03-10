import React, { useState, useEffect, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';

import './Article.scss';

import { AppContext } from '../../app-context';

import Loader from '../../components/loader/Loader';
import ErrorMessage from '../../components/error-message/ErrorMessage';
import Tags from '../../components/tags/Tags';

import useFetch from '../../custom-hooks/useFetch';

const Article = ({ match }) => {

  const slug = match.params.slug;
  const apiURI = `/articles/${slug}`;

  const [
    {
      response: deleteArticleResponse
    },
    doDeleteArticle
  ] = useFetch(apiURI);

  const [
    {
      response: fetchArticleResponse,
      isLoading: fetchArticleIsLoading,
      error: fetchArticleError
    },
    doFetchArticle
  ] = useFetch(apiURI);

  const [{ isLoggedIn, currentUser }] = useContext(AppContext);

  const [isSuccessfulDelete, setIsSuccessfulDelete] = useState(false);

  const isAuthor = () => {
    if (isLoggedIn === null || !fetchArticleResponse) return false;
    // if there is an id with response it is better to compare using id
    return currentUser.username === fetchArticleResponse.article.author.username;
  };

  const onDeleteArticle = () => {
    doDeleteArticle({
      method: 'delete'
    });
  };

  useEffect(() => {
    doFetchArticle();
  }, [doFetchArticle]);

  useEffect(() => {
    if (!deleteArticleResponse) return;
    setIsSuccessfulDelete(true);
  }, [deleteArticleResponse]);

  if (isSuccessfulDelete) return <Redirect to="/" />;

  return (
    <div className="article-page">
      <div className="banner">
        {!fetchArticleIsLoading && fetchArticleResponse && (
          <div className="container">
            <h1>{fetchArticleResponse.article.title}</h1>
            <div className="article-meta">
              <Link to={`/profiles/${fetchArticleResponse.article.author.username}`} >
                <img src={fetchArticleResponse.article.author.image} alt="Article author" />
              </Link>
              <div className="info ml-2 ">
                <Link to={`/profiles/${fetchArticleResponse.article.author.username}`} className="author" >
                  {fetchArticleResponse.article.author.username}
                </Link>
                <span className="date">{fetchArticleResponse.article.author.createdAt}</span>
              </div>
              {isAuthor() && (
                <span>
                  <Link to={`/articles/${fetchArticleResponse.article.slug}/edit`} className="btn btn-outline-secondary btn-sm">
                    <i className="ion-edit mr-1"></i>
                    Edit Article
                  </Link>
                  <button className="btn btn-outline-danger btn-sm ml-3" onClick={onDeleteArticle}>
                    <i className="ion-trash-a mr-1"></i>
                    Delete Article
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="container page">
        {fetchArticleIsLoading && <Loader />}
        {!fetchArticleIsLoading && fetchArticleError && <ErrorMessage />}
        {!fetchArticleIsLoading && fetchArticleResponse && (
          <div className="row article-content">
            <div>
              <p>{fetchArticleResponse.article.body}</p>
            </div>
            <Tags tags={fetchArticleResponse.article.tagList} />
          </div>
        )}
        <hr />
      </div>
    </div>
  );
};

export default Article;