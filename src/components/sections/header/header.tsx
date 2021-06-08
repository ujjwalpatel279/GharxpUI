import React, { FunctionComponent, ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';

import { Icon } from '../../shared';
import { Nav } from './nav/nav';
import { AnnouncementModal } from './announcement/announcement';
import { UserMenu } from './user-menu/user-menu';

import { getIntials } from '../../../shared/utils';

import './header.scss';
import gharlogo from '../../../images/gharlogo.png';

interface HeaderProps {
  firstName: string;
  lastName: string;
}

export const Header: FunctionComponent<HeaderProps> = ({ firstName, lastName }): ReactElement => {
  const [navVisible, toggleNavVisibility] = useState(false);
  const [userMenuVisible, toggleUserMenuVisibility] = useState(false);
  const [announcementVisible, toggleAnnouncementVisibility] = useState(false);

  return (
    <>
      <header className="c-header">
        <div className="c-header__logo">
          <Link to="/">
            <img src={gharlogo} alt="Ghar Experience" />
          </Link>
        </div>
        <div className="c-header__toggle-nav">
          <button type="button" className="c-header__toggle-nav-btn" onClick={() => toggleNavVisibility(!navVisible)}>
            <Icon name="burger" size="large" />
            <span className="u-hidden-visually">{navVisible ? 'Hide Site Navigation' : 'Show Site Navigation'}</span>
          </button>
        </div>
        <Nav visible={navVisible} toggleVisible={toggleNavVisibility} />
        <div className="c-header__user">
          <div className="c-announcement">
            <button
              type="button"
              className="c-header__toggle-user-btn c-header__toggle-announcement-btn u-mr-4"
              onClick={() => toggleAnnouncementVisibility(!announcementVisible)}
            >
              <span className="u-hidden-visually">Show Announcement</span>
              <Icon name="announcement" size="large" colour={announcementVisible ? 'blue' : 'primary'} />
            </button>
            <AnnouncementModal
              isOpen={announcementVisible}
              setToggle={toggleAnnouncementVisibility}
            ></AnnouncementModal>
          </div>
          <button
            type="button"
            className="c-header__toggle-user-btn"
            onClick={() => toggleUserMenuVisibility(!userMenuVisible)}
          >
            {firstName && lastName && <span>{getIntials(firstName, lastName)}</span>}
            <span className="u-hidden-visually">Show User Menu</span>
          </button>
          <UserMenu
            firstName={firstName}
            lastName={lastName}
            userMenuVisible={userMenuVisible}
            toggleUserMenu={toggleUserMenuVisibility}
          />
        </div>
      </header>
    </>
  );
};
