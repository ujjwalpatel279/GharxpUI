import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { signOut } from '../../../../shared/api/authentication';

import { Icon } from '../../../shared';

import { userMenuList, UserMenuListInterface } from './user-menu-list';

import './user-menu.scss';

interface UserMenuProps {
  firstName: string;
  lastName: string;
  userMenuVisible: boolean;
  toggleUserMenu: (arg0: boolean) => void;
}

export const UserMenu: FunctionComponent<UserMenuProps> = ({
  firstName,
  lastName,
  userMenuVisible,
  toggleUserMenu,
}) => {
  let userMenuClasses = 'c-user-menu';

  if (userMenuVisible) {
    userMenuClasses += ' isActive';
  }

  return (
    <section className={userMenuClasses}>
      <header className="c-user-menu__title">
        <h2>My Account</h2>
        <button type="button" className="c-user-menu__close" onClick={() => toggleUserMenu(!userMenuVisible)}>
          <Icon name="chevronRight" />
        </button>
      </header>
      <p className="c-user-menu__name">{`${firstName} ${lastName}`}</p>
      <ul className="c-user-menu__list">
        {userMenuList.map((menuItem: UserMenuListInterface) => (
          <li key={menuItem.linkName} className="c-user-menu__item">
            <Link to={menuItem.linkPath} className="c-user-menu__link" onClick={() => toggleUserMenu(!userMenuVisible)}>
              <Icon name={menuItem.icon} />
              <span>{menuItem.linkName}</span>
            </Link>
          </li>
        ))}
        <li className="c-user-menu__item c-user-menu__logout">
          <button
            type="button"
            className="c-user-menu__link"
            onClick={() => {
              signOut();
            }}
          >
            <Icon name="signout" />
            <span>Log out</span>
          </button>
        </li>
      </ul>
    </section>
  );
};
