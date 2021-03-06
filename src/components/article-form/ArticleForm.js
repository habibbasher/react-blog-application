import React, { useState, useEffect } from 'react';

import BackendErrorMessages from '../backend-error-messages/BackendErrorMessages';

const ArticleForm = ({ onFormSubmit, errors, initialValues, isUpdate }) => {

  let [title, setTitle] = useState('');
  let [description, setDescription] = useState('');
  let [body, setBody] = useState('');
  let [tagList, setTagList] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    onFormSubmit({ title, description, body, tagList: tagList.split(' ') });
  };

  useEffect(() => {

    if (!initialValues) return;

    setTitle(initialValues.title);
    setDescription(initialValues.description);
    setBody(initialValues.body);
    setTagList(initialValues.tagList);
  }, [initialValues]);

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            {errors && <BackendErrorMessages backendErrors={errors} />}
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Article Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="What is this article about?"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    rows="8"
                    placeholder="Write your article (in markdown)"
                    value={body}
                    onChange={e => setBody(e.target.value)}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter tags"
                    value={tagList}
                    onChange={e => setTagList(e.target.value)}
                  />
                </fieldset>
                <fieldset>
                  <fieldset className="form-group">
                    {isUpdate &&
                      <button type="submit" className="btn btn-lg pull-xs-right btn-primary">
                        Update Article
                      </button>
                    }
                    {!isUpdate &&
                      <button type="submit" className="btn btn-lg pull-xs-right btn-primary">
                        Publish Article
                      </button>
                    }

                  </fieldset>
                </fieldset>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleForm;