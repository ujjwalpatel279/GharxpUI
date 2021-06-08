import React, { ChangeEvent, forwardRef } from 'react';

import './filter-select.scss';
interface OptionsInterface {
  id: string | number;
  value: string;
  displayText?: string;
  selectable?: boolean;
}

interface FilterSelectProps {
  id: string;
  options: OptionsInterface[];
  forceSelection?: boolean;
  placeHolder?: string;
  required: boolean;
  disabled?: boolean;
  error?: boolean;
  value?: string | number | boolean;
  onChange?: (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
}

type Ref = HTMLSelectElement;

export const FilterSelect = forwardRef<Ref, FilterSelectProps>(
  ({ id, options, forceSelection, placeHolder, required, disabled, error, onChange, value }, ref) => {
    let selectClasses = 'c-form-select';

    if (error) {
      selectClasses += ' isInvalid';
    }

    if (required) {
      selectClasses += ' isRequired';
    }

    if (value) {
      selectClasses += ' isFiltered';
    }

    return (
      <div className="c-input-select-wrapper">
        <select
          name={id}
          id={id}
          className={selectClasses}
          ref={ref}
          placeholder={placeHolder}
          disabled={disabled}
          required={required}
          aria-invalid={error ? 'true' : 'false'}
          data-testid="filter-select"
          onChange={onChange}
        >
          {forceSelection && (
            <option value="0" selected disabled hidden>
              {placeHolder}
            </option>
          )}
          {options.map((option: OptionsInterface) => (
            <option key={option.id} value={option.id} disabled={option.selectable ?? true ? false : true}>
              {option.displayText ?? option.value}
            </option>
          ))}
        </select>
      </div>
    );
  },
);

FilterSelect.displayName = 'FilterSelect';
