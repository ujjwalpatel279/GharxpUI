import React, { ChangeEvent, forwardRef } from 'react';
import './input-checkbox.scss';

interface InputCheckboxProps {
  id: string;
  defaultValue?: boolean;
  onToggle?: (e: ChangeEvent<HTMLInputElement>) => void;
  dataValue?: string | number;
}

type Ref = HTMLInputElement;

export const InputCheckbox = forwardRef<Ref, InputCheckboxProps>(({ id, defaultValue, onToggle, dataValue }, ref) => {
  return (
    <div className="c-input-checkbox">
      <input
        id={id}
        type="checkbox"
        ref={ref}
        {...(dataValue && { 'data-value': dataValue })}
        defaultChecked={defaultValue}
        onChange={onToggle}
      />
    </div>
  );
});

InputCheckbox.displayName = 'InputCheckbox';
