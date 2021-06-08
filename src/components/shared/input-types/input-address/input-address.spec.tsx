import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { InputAddress } from './input-address';

const errors = {
  propertyName: '',
  propertyNumber: '',
  road: '',
  town: '',
  county: '',
  postCode: '',
};

describe('InputAddress Component', () => {
  afterEach(cleanup);

  const mock = jest.fn();

  it('renders the form Address component', () => {
    const { container } = render(<InputAddress errors={errors} register={mock} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders the manual entry form on click', () => {
    const { getByText, getByPlaceholderText } = render(<InputAddress errors={errors} register={mock} />);
    const enterManuallyButton = getByText('Enter address manually');

    expect(enterManuallyButton).toBeInTheDocument();
    fireEvent.click(enterManuallyButton);

    expect(getByPlaceholderText('Property Name')).toBeInTheDocument();
    expect(getByPlaceholderText('Property Number')).toBeInTheDocument();
    expect(getByPlaceholderText('Road')).toBeInTheDocument();
    expect(getByPlaceholderText('Town')).toBeInTheDocument();
    expect(getByPlaceholderText('County')).toBeInTheDocument();
  });

  it('on click the "Enter Manually" button changes to "Use Post Code Lookup"', () => {
    const { getByText } = render(<InputAddress errors={errors} register={mock} />);
    const enterManuallyButton = getByText('Enter address manually');
    expect(enterManuallyButton).toBeInTheDocument();
    fireEvent.click(enterManuallyButton);
    expect(getByText('Use Postcode lookup')).toBeInTheDocument();
  });
});
