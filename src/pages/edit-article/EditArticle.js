import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { AppContext } from '../../app-context';

import useFetch from '../../custom-hooks/useFetch';

import ArticleForm from '../../components/article-form/ArticleForm';

const EditArticle = ({ match }) => {

  const slug = match.params.slug;
  const articleUpdateURI = `/articles/${slug}`;

  const [{ response: updateArticleResponse, error: updateArticleError }, doUpdateArticle] = useFetch(articleUpdateURI);

  const [{ response: fetchArticleResponse }, doFetchArticle] = useFetch(articleUpdateURI);

  const [{ isLoggedIn }] = useContext(AppContext);

  const [isSuccessfulSubmit, setIsSuccessfulSubmit] = useState(false);

  const [initialValues, setInitialValues] = useState(null)

  const onFormSubmit = async (article) => {
    doUpdateArticle({
      method: 'put',
      data: {
        article
      }
    });
  };

  const errors = {};

  useEffect(() => {
    if (!updateArticleResponse) return;
    setIsSuccessfulSubmit(true);
  }, [updateArticleResponse]);

  useEffect(() => {
    doFetchArticle();
  }, [doFetchArticle]);

  useEffect(() => {

    if (!fetchArticleResponse) return;

    setInitialValues({
      ...initialValues,
      ...fetchArticleResponse.article,
      tagList: fetchArticleResponse.article.tagList.join(' ')
    });
  }, [initialValues, fetchArticleResponse]);

  // Be careful when you want to change something here.
  if (isLoggedIn === null) return null;

  if (isLoggedIn === false) return <Redirect to="/" />;

  if (isSuccessfulSubmit) return <Redirect to={`/articles/${slug}`} />;

  return (
    <div>
      <ArticleForm
        onFormSubmit={onFormSubmit}
        initialValues={initialValues}
        errors={(updateArticleError && updateArticleError.errors) || errors}
        isUpdate={true}
      />
    </div>
  );
};

export default EditArticle;

