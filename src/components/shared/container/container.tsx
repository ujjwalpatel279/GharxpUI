import React, { FunctionComponent } from 'react';

import './container.scss';

interface ContainerProps {
  extendClass?: string;
  ctabar?: boolean;
  fullWidth?: boolean;
}

export const Container: FunctionComponent<ContainerProps> = ({ children, extendClass, fullWidth, ctabar }) => {
  let containerClasses = 'c-container';

  if (extendClass) containerClasses += ` ${extendClass}`;

  if (ctabar) {
    containerClasses += ' c-container--ctabar';
  }

  if (fullWidth) {
    containerClasses += ' c-container--fullwidth';
  }

  return <div className={containerClasses}>{children}</div>;
};
