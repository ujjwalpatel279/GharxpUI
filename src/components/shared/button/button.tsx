import React, { FunctionComponent, ReactElement, MouseEvent } from 'react';
import { Icon, IconNames } from '../icon/icon';

import './button.scss';

export interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  variant: 'primary' | 'secondary' | 'outline' | 'navy' | 'bare';
  size?: 'small' | 'large';
  width?: 'full';
  dataValue?: string | number;
  disabled?: boolean;
  childClasses?: string;
  icon?: IconNames;
  iconPosition?: 'left' | 'right';
  textHidden?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  hiddenInLargerScreens?: boolean;
  visibility?: boolean;
}

export const Button: FunctionComponent<ButtonProps> = ({
  type,
  variant,
  size,
  width,
  dataValue,
  disabled,
  childClasses,
  icon,
  iconPosition,
  textHidden,
  onClick,
  children,
  hiddenInLargerScreens,
}): ReactElement => {
  let btnClasses = `c-btn c-btn--${variant}`;

  if (size) {
    btnClasses += ` c-btn--${size}`;
  }

  if (width === 'full') {
    btnClasses += ` u-width-100`;
  }

  if (disabled) {
    btnClasses += ` disabled`;
  }

  if (childClasses) {
    btnClasses += ` ${childClasses}`;
  }

  if (iconPosition === 'left') {
    btnClasses += ' c-btn--icon-left';
  }

  if (iconPosition === 'right') {
    btnClasses += ' c-btn--icon-right';
  }

  if (textHidden) {
    btnClasses += ' c-btn--text-hidden';
  }

  if (hiddenInLargerScreens) {
    btnClasses += ` c-btn__larger_screens_hidden`;
  }

  return (
    <button
      type={type}
      className={btnClasses}
      disabled={disabled}
      {...(dataValue && { 'data-value': dataValue })}
      onClick={onClick}
    >
      {icon && (iconPosition === 'left' || textHidden) && <Icon name={icon} />}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <Icon name={icon} />}
    </button>
  );
};
