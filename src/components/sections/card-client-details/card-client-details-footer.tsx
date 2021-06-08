import React, { FunctionComponent, MouseEvent } from 'react';
import { CardFooter } from '../../shared/card/card-footer';

import './card-clients.scss';

export interface CardFooterProps {
  handleExpand?: (e: MouseEvent<HTMLButtonElement>) => void;
  expanded: boolean;
}

export const CardClientDetailsFooter: FunctionComponent<CardFooterProps> = ({
  handleExpand,
  expanded,
}): JSX.Element => {
  return (
    <CardFooter>
      <footer>
        <button onClick={handleExpand} className="notes__text u-fs-2">
          <b>{expanded ? 'See less' : 'See more'}</b>
        </button>
      </footer>
    </CardFooter>
  );
};
