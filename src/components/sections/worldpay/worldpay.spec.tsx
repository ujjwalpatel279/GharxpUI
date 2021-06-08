import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { WorldPay } from './worldpay';

describe('WorldPay Component', () => {
  afterEach(cleanup);

  it('renders the WorldPay component', () => {
    const { container } = render(<WorldPay show={true} fees={[]} handleClose={() => null} caseId={1} formId={1} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Shows correct form text', () => {
    const { getByText } = render(
      <BrowserRouter>
        <WorldPay show={true} fees={[]} handleClose={() => null} caseId={1} formId={1} />
      </BrowserRouter>,
    );

    expect(getByText('Email Address')).toBeInTheDocument();
    expect(getByText('Address Line 1')).toBeInTheDocument();
    expect(getByText('Postcode')).toBeInTheDocument();
    expect(getByText('Country')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
    expect(getByText('Pay')).toBeInTheDocument();
  });
});
