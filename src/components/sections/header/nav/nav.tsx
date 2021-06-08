import React, { FunctionComponent, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { NavListInterface, navList } from './nav-list';
import { Icon } from '../../../shared';

import './nav.scss';
import { services } from '../../../../shared';
import { ModuleTextInterface } from '../../../../shared/models';

interface NavProps {
  visible: boolean;
  toggleVisible: (arg0: boolean) => void;
}

export const Nav: FunctionComponent<NavProps> = ({ visible, toggleVisible }) => {
  let navClasses = 'c-site-nav';
  const [lendingCriteria, setLendingCriteria] = useState<ModuleTextInterface>();

  if (visible) {
    navClasses += ' isActive';
  }

  if (!lendingCriteria)
    services.getModuleText('[LENDING-CRITERIA]__OTHER_TEXTS').then((res) => setLendingCriteria(res.data));

  return (
    <nav className={navClasses}>
      <header className="c-site-nav__title">
        <h2>Navigation</h2>
        <button type="button" className="c-site-nav__close" onClick={() => toggleVisible(!visible)}>
          <Icon name="chevronLeft" />
        </button>
      </header>
      <ul className="c-site-nav__list">
        {navList.map((link: NavListInterface) => (
          <li key={link.linkName} className="c-site-nav__item">
            <NavLink
              to={link.linkPath}
              className="c-site-nav__link"
              activeClassName="isActive"
              onClick={() => toggleVisible(!visible)}
            >
              <Icon name={link.icon} />
              <span>{link.linkName}</span>
            </NavLink>
          </li>
        ))}
        {lendingCriteria && lendingCriteria.description?.length > 0 && (
          <li key="lending criteria" className="c-site-nav__item">
            <a target="_blank" rel="noreferrer" href={lendingCriteria.description} className="c-site-nav__link">
              <Icon name="lendingcriteria" />
              <span>Lending Criteria</span>
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};
