import React, { FunctionComponent } from 'react';

interface FormFieldProps {
  id?: string;
  label: string;
  error?: string;
  display?: boolean;
}

import './form-field.scss';

export const FormField: FunctionComponent<FormFieldProps> = ({ id, label, error, children, display }) => {
  const labelAttributes = {
    className: 'c-form-field__label',
    htmlFor: id || null,
  };

  return (
    <div className={display ?? true ? 'c-form-field' : 'c-form-field__hidden'}>
      <label {...labelAttributes}>{label}</label>
      {children}
      {error && (
        <p key={error} role="alert" className="c-form-field__error">
          {error}
        </p>
      )}
    </div>
  );
};
