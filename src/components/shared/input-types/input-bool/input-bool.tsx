import React, { forwardRef, useEffect, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { InputListItem } from '../input-list-item/input-list-item';

interface InputBoolProps {
  name: string;
  legend: string;
  setValue?: ReturnType<typeof useForm>['setValue'];
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

type Ref = HTMLInputElement;

export const InputBool = forwardRef<Ref, InputBoolProps>(
  ({ name, legend, setValue, value, onChange, disabled }, ref) => {
    useEffect(() => {
      if (value) {
        setValue(name, value);
      }
    }, [value]);

    return (
      <fieldset>
        <legend>{legend}</legend>
        <div className="l-flex l-flex--wrap">
          <div>
            <InputListItem
              type="radio"
              id={`yes-${name}`}
              name={name}
              value="Yes"
              ref={ref}
              onChange={onChange}
              disabled={disabled}
            />
          </div>
          <div>
            <InputListItem
              type="radio"
              id={`no-${name}`}
              name={name}
              value="No"
              ref={ref}
              onChange={onChange}
              disabled={disabled}
            />
          </div>
        </div>
      </fieldset>
    );
  },
);

InputBool.displayName = 'InputBool';
