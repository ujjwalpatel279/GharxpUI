import React, { FunctionComponent, ReactElement } from 'react';

import './column.scss';

interface ColumnProps {
  spaced?: boolean;
  hiddenInSmallerScreens?: boolean;
  grow?: 1 | 2 | 3;
  mb?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
}

export const Column: FunctionComponent<ColumnProps> = ({
  children,
  mb,
  spaced,
  hiddenInSmallerScreens,
}): ReactElement => {
  let columnClasses = 'c-column';

  if (mb) {
    columnClasses += ` u-mb-${mb}`;
  }
  if (spaced) {
    columnClasses += ` c-column__spaced`;
  }
  if (hiddenInSmallerScreens) {
    columnClasses += ` c-column__smaller_screens_hidden`;
  }
  return <div className={columnClasses}>{children}</div>;
};
