import React, { forwardRef } from 'react';

interface FormFieldProps {
  id: string;
  type?: 'text' | 'email' | 'number' | 'tel';
  value?: string;
  placeHolder?: string;
  error?: boolean;
}

import './form-input.scss';

export const FormInput = forwardRef(
  ({ id, type = 'text', value, placeHolder, error }: FormFieldProps, ref: React.Ref<HTMLInputElement>) => {
    let inputClasses = 'c-form-input';

    if (error) {
      inputClasses += ' isInvalid';
    }
    return (
      <input
        type={type}
        id={id}
        name={id}
        defaultValue={value}
        placeholder={placeHolder}
        className={inputClasses}
        ref={ref}
        aria-invalid={error ? 'true' : 'false'}
      />
    );
  },
);

FormInput.displayName = 'FormInput';
