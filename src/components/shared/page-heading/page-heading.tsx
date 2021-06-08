import React, { FunctionComponent, ReactElement } from 'react';

import { Heading, Pill } from '..';
import { Icon, IconNames } from '../icon/icon';

import './page-heading.scss';

interface PageHeadingProps {
  headingLevel: 1 | 2 | 3 | 4;
  icon?: IconNames;
  initials?: string;
  title: string;
  subText?: string;
  progress?: ReactElement;
  mb?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const PageHeading: FunctionComponent<PageHeadingProps> = ({
  headingLevel,
  initials,
  icon,
  title,
  subText,
  progress,
  mb,
}) => {
  let classes = 'c-page-heading';

  if (mb) {
    classes += ` u-mb-${mb}`;
  }

  return (
    <div className={classes}>
      <div className="c-page-heading__icon">
        {icon && <Icon name={icon} />}
        {initials && <span className="c-page-heading__initials">{initials}</span>}
      </div>
      <div className="c-page-heading__body">
        <div className="c-page-heading__headingwrap">
          <Heading level={`h${headingLevel}` as 'h1' | 'h2' | 'h3' | 'h4'} title={title} />
          <div>{progress && progress}</div>
        </div>
        {subText && <p className="c-page-heading__subtext">{subText}</p>}
      </div>
    </div>
  );
};
