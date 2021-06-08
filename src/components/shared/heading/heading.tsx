import React, { FunctionComponent, ReactElement } from 'react';

interface HeadingProps {
  level: 'h1' | 'h2' | 'h3' | 'h4';
  title: string;
  mb?: 1 | 2 | 3 | 4 | 5 | 6;
  extendClass?: string;
}

import './heading.scss';

export const Heading: FunctionComponent<HeadingProps> = ({ level, title, mb, extendClass }): ReactElement => {
  const HeadingLevel = level;

  let classes = `c-heading c-heading--${level}`;

  if (mb) {
    classes += ` u-mb-${mb}`;
  }
  if (extendClass) {
    classes += ` ${extendClass}`;
  }

  return <HeadingLevel className={classes}>{title}</HeadingLevel>;
};
