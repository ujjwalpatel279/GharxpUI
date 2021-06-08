import React, { forwardRef, useEffect, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { InputListItem } from '..';

interface Options {
  id: string | number;
  value: string;
}

interface InputRadioProps {
  name: string;
  legend: string;
  options: Options[];
  setValue?: ReturnType<typeof useForm>['setValue'];
  value?: string; //option.value
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

type Ref = HTMLInputElement;

export const InputRadio = forwardRef<Ref, InputRadioProps>(
  ({ name, legend, options, setValue, value, onChange, disabled }, ref) => {
    useEffect(() => {
      if (value) {
        setValue(name, value);
      }
    }, [value]);

    return (
      <fieldset>
        <legend>{legend}</legend>
        <div className="l-flex l-flex--wrap">
          {options?.map((option: Options) => (
            <div key={option.id}>
              <InputListItem
                type="radio"
                id={option.id}
                name={name}
                value={option.value}
                ref={ref}
                onChange={onChange}
                disabled={disabled}
              />
            </div>
          ))}
        </div>
      </fieldset>
    );
  },
);
InputRadio.displayName = 'InputRadio';
