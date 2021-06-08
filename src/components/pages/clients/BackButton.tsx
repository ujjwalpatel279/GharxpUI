import React, { FunctionComponent, ReactElement } from 'react';
import { Button } from '../../shared';
import { ButtonProps } from '../../shared/button/button';

import './back-button.scss';

export const BackButton: FunctionComponent<ButtonProps> = ({
  type,
  variant,
  onClick,
  width,
  visibility,
}): ReactElement => {
  return (
    <div className={`back-button ${visibility ? '' : 'back-button__display-btn'}`}>
      <Button
        type={type}
        variant={variant}
        onClick={onClick}
        width={width}
        icon="chevronLeft"
        iconPosition="left"
        childClasses="u-flex__align-right"
      >
        back
      </Button>
    </div>
  );
};
