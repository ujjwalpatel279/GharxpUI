import React, { ChangeEvent, forwardRef } from 'react';

import './input-list-item.scss';

interface InputListItemProps {
  type: 'radio' | 'checkbox';
  id: string | number;
  name: string;
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

type Ref = HTMLInputElement;

export const InputListItem = forwardRef<Ref, InputListItemProps>(
  ({ type, id, name, value, onChange, disabled }, ref) => (
    <label htmlFor={id.toString()} className="c-input-list-item">
      <input
        type={type}
        id={id.toString()}
        name={name}
        defaultValue={value}
        ref={ref}
        onChange={onChange}
        disabled={disabled}
      />
      <span className="c-radio-input__inner">
        <span>{value}</span>
      </span>
    </label>
  ),
);

InputListItem.displayName = 'InputListItem';
