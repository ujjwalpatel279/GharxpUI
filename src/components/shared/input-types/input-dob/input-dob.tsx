import React, { FunctionComponent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form/dist/index.ie11';
import { validation } from '../../../../shared/validation/validation';
import { Input } from '..';

interface InputDobProps {
  register: ReturnType<typeof useForm>['register'];
  required: boolean;
  errors?: ReturnType<typeof useForm>['errors'];
  setValue?: ReturnType<typeof useForm>['setValue'];
  value?: string;
  name: string;
  getValues?: ReturnType<typeof useForm>['getValues'];
  disabled?: boolean;
}

export const InputDob: FunctionComponent<InputDobProps> = ({
  register,
  required,
  errors,
  setValue,
  value,
  name,
  disabled,
}) => {
  const [day, setDay] = useState<string>();
  const [month, setMonth] = useState<string>();
  const [year, setYear] = useState<string>();

  useEffect(() => {
    if (value) {
      const date = value.split('-');
      setDay(date[2].split('T')[0]);
      setMonth(date[1]);
      setYear(date[0]);
    }
  }, [value]);

  return (
    <div className="l-flex">
      <div>
        <Input
          id={`${name}Day`}
          error={errors && !!errors[`${name}Day`]}
          placeHolder="DD"
          required={required}
          ref={register(validation.dob.types.day)}
          setValue={setValue}
          value={day}
          disabled={disabled}
        />
      </div>
      <div>
        <Input
          id={`${name}Month`}
          error={errors && !!errors[`${name}Month`]}
          placeHolder="MM"
          required={required}
          ref={register(validation.dob.types.month)}
          setValue={setValue}
          value={month}
          disabled={disabled}
        />
      </div>
      <div>
        <Input
          id={`${name}Year`}
          error={errors && !!errors[`${name}Year`]}
          placeHolder="YYYY"
          required={required}
          ref={register(validation.dob.types.year)}
          setValue={setValue}
          value={year}
          disabled={disabled}
        />
      </div>
    </div>
  );
};
