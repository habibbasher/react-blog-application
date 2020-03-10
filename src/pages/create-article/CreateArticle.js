import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { AppContext } from '../../app-context';
import useFetch from '../../custom-hooks/useFetch';

import ArticleForm from '../../components/article-form/ArticleForm';

const CreateArticle = () => {

  const articlesURI = '/articles';
  const [{ response, error }, doFetch] = useFetch(articlesURI);

  const [{ isLoggedIn }] = useContext(AppContext);

  const [isSuccessfulSubmit, setIsSuccessfulSubmit] = useState(false);

  const onFormSubmit = async (article) => {
    doFetch({
      method: 'post',
      data: {
        article
      }
    });
  };

  const errors = {};

  useEffect(() => {
    if (!response) return;
    setIsSuccessfulSubmit(true);
  }, [response]);

  // Be careful when you want to change something here.
  if (isLoggedIn === null) return null;

  if (isSuccessfulSubmit || isLoggedIn === false) return <Redirect to="/" />;

  return (
    <div>
      <ArticleForm
        onFormSubmit={onFormSubmit}
        initialValues={null}
        errors={(error && error.errors) || errors}
        isUpdate={false}
      />
    </div>
  );
};

export default CreateArticle;

