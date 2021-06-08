import React, { FunctionComponent, ReactElement } from 'react';

import './row.scss';

interface RowProps {
  mb?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  relativeRow?: boolean;
}

export const Row: FunctionComponent<RowProps> = ({ children, mb, relativeRow }): ReactElement => {
  let rowClasses = 'c-row';

  if (mb) {
    rowClasses += ` u-mb-${mb}`;
  }

  if (relativeRow) {
    rowClasses += ` c-row__relative-row`;
  }

  return <div className={rowClasses}>{children}</div>;
};
