import React, { forwardRef, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';

import { InputSelect, InputRadio } from '..';

interface Options {
  id: number | string;
  value: string;
}

interface InputListProps {
  id: string;
  forceSelection?: boolean;
  legend: string;
  options: Options[];
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  setValue?: ReturnType<typeof useForm>['setValue'];
  value?: string;
  inputListChangeHandler?: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

type Refs = HTMLInputElement | HTMLSelectElement;

export const InputList = forwardRef<Refs, InputListProps>(
  (
    { id, forceSelection, legend, options, required, disabled, error, setValue, value, inputListChangeHandler },
    ref,
  ) => (
    <>
      {options?.length > 6 ? (
        <InputSelect
          id={id}
          options={options}
          forceSelection={forceSelection}
          required={required}
          error={error}
          ref={ref as React.Ref<HTMLSelectElement>}
          setValue={setValue}
          value={value}
          onChange={inputListChangeHandler}
          disabled={disabled}
        />
      ) : (
        <InputRadio
          name={id}
          legend={legend}
          options={options}
          ref={ref as React.Ref<HTMLInputElement>}
          setValue={setValue}
          value={value}
          onChange={inputListChangeHandler}
          disabled={disabled}
        />
      )}
    </>
  ),
);

InputList.displayName = 'InputList';
