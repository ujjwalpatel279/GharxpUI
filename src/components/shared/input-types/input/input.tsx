import React, { ChangeEvent, forwardRef, KeyboardEvent, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import './input.scss';
interface InputProps {
  id: string;
  type?: 'text' | 'number' | 'email' | 'tel' | 'search';
  placeHolder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  childClasses?: string;
  onKeyUp?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  setValue?: ReturnType<typeof useForm>['setValue'];
  value?: string | number | boolean;
  name?: string;
}

type Ref = HTMLInputElement;

export const Input = forwardRef<Ref, InputProps>(
  (
    {
      id,
      type = 'text',
      placeHolder,
      onChange,
      onKeyUp,
      setValue,
      disabled,
      required,
      error,
      childClasses,
      value,
      name,
    },
    ref,
  ) => {
    let inputClasses = 'c-input';

    useEffect(() => {
      if (value) {
        setValue(id, value);
      }
    }, [value]);

    if (disabled) {
      inputClasses += ' isDisabled';
    }

    if (error) {
      inputClasses += ' isInvalid';
    }

    if (required) {
      inputClasses += ' isRequired';
    }

    if (value) {
      inputClasses += ' hasValue';
    }

    if (childClasses) {
      inputClasses += ` ${childClasses}`;
    }

    return (
      <input
        type={type}
        id={id}
        name={name ?? id}
        placeholder={placeHolder}
        className={inputClasses}
        ref={ref}
        aria-invalid={error ? 'true' : 'false'}
        required={required}
        disabled={disabled}
        onKeyUp={onKeyUp}
        onChange={onChange}
      />
    );
  },
);

Input.displayName = 'Input';
