import React, { useContext, Fragment } from 'react';

import { AppContext } from '../../app-context';

import { ReactComponent as Logo } from '../../assets/img/crown.svg';
import './Header.scss';

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink
} from './Header.Styles';

const Header = () => {

  const [currentUserState] = useContext(AppContext);
  console.log('currentUserState: ', currentUserState);

  return (
    <HeaderContainer>
      <LogoContainer to='/'>
        <Logo className='logo' />
      </LogoContainer>
      <OptionsContainer>
        <OptionLink to='/blog'>BLOG</OptionLink>
        <OptionLink to='/shop'>CONTACT</OptionLink>
        {currentUserState.isLoggedIn ? (
          <Fragment>
            <OptionLink to='/articles/new'>NEW POST</OptionLink>
            <OptionLink to='/settings'>SETTINGS</OptionLink>
            <OptionLink to={`/profiles/${currentUserState.currentUser.username}`}>PROFILE</OptionLink>
            <OptionLink to='' as='div'>
              SIGN OUT
            </OptionLink>
          </Fragment>
        ) : (
            <div>
              <OptionLink to='/signup'>SIGN UP</OptionLink>
              <OptionLink to='/signin'>SIGN IN</OptionLink>
            </div>
          )}
      </OptionsContainer>
    </HeaderContainer>
  );
};


export default Header;