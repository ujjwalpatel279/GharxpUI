import React, { forwardRef } from 'react';

import './form-radio-group.scss';

interface Attributes {
  id: number;
  value: string;
}

interface FormRadioGroupProps {
  name: string;
  attributes: Attributes[];
}

export const FormRadioGroup = forwardRef(
  ({ name, attributes }: FormRadioGroupProps, ref: React.Ref<HTMLInputElement>) => (
    <div className="l-flex l-flex--wrap">
      {attributes.map((attribute: Attributes) => (
        <div key={attribute.id}>
          <label htmlFor={attribute.value} className="c-radio-input">
            <input type="radio" id={attribute.value} name={name} value={attribute.value} ref={ref} />
            <span className="c-radio-input__inner">
              <span>{attribute.value}</span>
            </span>
          </label>
        </div>
      ))}
    </div>
  ),
);

FormRadioGroup.displayName = 'FormRadioGroup';
