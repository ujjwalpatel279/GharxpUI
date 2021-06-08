import React, { forwardRef, ChangeEvent } from 'react';

interface OptionsInterface {
  id: number | string;
  value: string;
  displayText?: string;
  selectable?: boolean;
}

interface FormFieldProps {
  id: string;
  options: OptionsInterface[];
  error?: boolean;
  displayDefaultSelect?: boolean;
  changeHandler?: (e: ChangeEvent<HTMLSelectElement>) => void;
  value?: number;
}

import './form-select.scss';

export const FormSelect = forwardRef(
  (
    { id, options, error, displayDefaultSelect, changeHandler, value }: FormFieldProps,
    ref: React.Ref<HTMLSelectElement>,
  ) => {
    let selectClasses = 'c-form-select';

    if (error) {
      selectClasses += ' isInvalid';
    }

    return (
      <div className="c-form-select-wrapper">
        <select
          name={id}
          id={id}
          className={selectClasses}
          ref={ref}
          aria-invalid={error ? 'true' : 'false'}
          data-testid="form-select"
          onChange={changeHandler}
          value={value}
        >
          {(displayDefaultSelect ?? true) && <option value="">Please select</option>}
          {options.map((option: OptionsInterface) => (
            <option key={option.id} value={option.value} disabled={option.selectable ?? true ? false : true}>
              {option.displayText ?? option.value}
            </option>
          ))}
        </select>
      </div>
    );
  },
);

FormSelect.displayName = 'FormSelect';
