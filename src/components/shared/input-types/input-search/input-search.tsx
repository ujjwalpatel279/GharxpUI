import React, { FunctionComponent, KeyboardEvent } from 'react';
import { useForm } from 'react-hook-form';

import { Input } from '../';
import { Icon } from '../..';

import './input-search.scss';

interface InputSearchProps {
  id: string;
  onKeyUp?: (e: KeyboardEvent<HTMLInputElement>) => void;
  setValue?: ReturnType<typeof useForm>['setValue'];
  value?: string;
}

export const InputSearch: FunctionComponent<InputSearchProps> = ({ id, onKeyUp, setValue, value }) => (
  <div className="c-input-search">
    <Icon name="search" />
    <Input type="text" id={id} placeHolder="Search" onKeyUp={onKeyUp} setValue={setValue} value={value} />
  </div>
);
