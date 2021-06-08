import React, { forwardRef, KeyboardEvent } from 'react';
import { useForm } from 'react-hook-form';

import { Input } from '../';
import { Icon } from '../..';

import './input-currency.scss';

interface InputCurrencyProps {
  id: string;
  placeHolder?: string;
  required?: boolean;
  error?: boolean;
  disabled?: boolean;
  setValue?: ReturnType<typeof useForm>['setValue'];
  value?: string;
  onKeyUp?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

type Ref = HTMLInputElement;

export const InputCurrency = forwardRef<Ref, InputCurrencyProps>(
  ({ id, required, error, disabled, placeHolder, setValue, value, onKeyUp }, ref) => {
    let inputCurrencyClasses = 'c-input-currency';

    if (required) {
      inputCurrencyClasses += ' isRequired';
    }

    return (
      <div className={inputCurrencyClasses}>
        <span className="c-input-currency__icon">
          <Icon name="pound" />
        </span>
        <Input
          type="number"
          error={error}
          id={id}
          placeHolder={placeHolder}
          ref={ref}
          setValue={setValue}
          value={value}
          onKeyUp={onKeyUp}
          required={required}
          disabled={disabled}
        />
      </div>
    );
  },
);

InputCurrency.displayName = 'InputCurrency';
