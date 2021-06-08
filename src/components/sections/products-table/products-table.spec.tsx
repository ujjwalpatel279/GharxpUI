import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ProductTable } from './products-table';

describe('Product Table Component', () => {
  afterEach(cleanup);
  test('Shows no products message', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <ProductTable rateTypes={[]} productCategories={[]} productList={[]} handleKey={() => null} />
      </BrowserRouter>,
    );

    expect(getByText('No products are currently available')).toBeInTheDocument();
  });

  test('Columns are visible on page', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <ProductTable rateTypes={[]} productCategories={[]} productList={[]} handleKey={() => null} />
      </BrowserRouter>,
    );

    expect(getByText('Product')).toBeInTheDocument();
    expect(getByText('Rate Type')).toBeInTheDocument();
    expect(getByText('Loan Purpose')).toBeInTheDocument();
    expect(getByText('Product Code')).toBeInTheDocument();
    expect(getByText('% Initial Rate')).toBeInTheDocument();
    expect(getByText('% Subsequent Rate')).toBeInTheDocument();
    expect(getByText('% LTV')).toBeInTheDocument();
    expect(getByText('Product Fee')).toBeInTheDocument();
    expect(getByText('ERC')).toBeInTheDocument();
  });
});
