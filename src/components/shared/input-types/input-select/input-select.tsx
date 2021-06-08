import React, { ChangeEvent, forwardRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import './input-select.scss';
interface OptionsInterface {
  id: string | number;
  value: string;
  displayText?: string;
  selectable?: boolean;
}

interface InputSelectProps {
  id: string;
  options: OptionsInterface[];
  forceSelection?: boolean;
  required: boolean;
  disabled?: boolean;
  error?: boolean;
  setValue?: ReturnType<typeof useForm>['setValue'];
  value?: string | number | boolean;
  onChange?: (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
}

type Ref = HTMLSelectElement;

export const InputSelect = forwardRef<Ref, InputSelectProps>(
  ({ id, options, forceSelection, required, disabled, error, onChange, setValue, value }, ref) => {
    let selectClasses = 'c-form-select';

    useEffect(() => {
      if (value && setValue) {
        setValue(id, value);
      }
    }, [value]);

    if (error) {
      selectClasses += ' isInvalid';
    }

    if (required) {
      selectClasses += ' isRequired';
    }

    return (
      <div className="c-input-select-wrapper">
        <select
          name={id}
          id={id}
          className={selectClasses}
          ref={ref}
          disabled={disabled}
          required={required}
          aria-invalid={error ? 'true' : 'false'}
          data-testid="input-select"
          onChange={onChange}
        >
          {forceSelection && <option value="">Please select</option>}
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

InputSelect.displayName = 'InputSelect';
