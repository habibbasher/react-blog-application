import React from 'react';
import { Switch, Route } from 'react-router-dom';
import GlobalFeed from './pages/global-feed/GlobalFeed';
import Article from './pages/article/Article';
import SignUp from './components/sign-up/SignUp';
import SignIn from './components/sign-in/SignIn';
import TagFeed from './pages/tag-feed/TagFeed';
import MyFeed from './pages/my-feed/MyFeed';
import CreateArticle from './pages/create-article/CreateArticle';
import EditArticle from './pages/edit-article/EditArticle';
import Settings from './pages/settings/Settings';
import UserProfile from './pages/user-profile/UserProfile';

const Routes = () => {
  return (
    <Switch>
      <Route path='/' exact component={GlobalFeed} />
      <Route path='/profiles/:slug' component={UserProfile} />
      <Route path='/profiles/:slug/favorites' component={UserProfile} />
      <Route path='/settings' component={Settings} />
      <Route path='/articles/new' component={CreateArticle} />
      <Route path='/articles/:slug/edit' component={EditArticle} />
      <Route path='/feed' component={MyFeed} />
      <Route path='/tags/:slug' component={TagFeed} />
      <Route path='/signup' exact component={SignUp} />
      <Route path='/signin' exact component={SignIn} />
      <Route path='/articles/:slug' component={Article} />
    </Switch>
  );
};

export default Routes;