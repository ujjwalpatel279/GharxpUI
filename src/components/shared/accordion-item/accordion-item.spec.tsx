import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { AccordionItem } from './accordion-item';

describe('AccordionItem Component', () => {
  afterEach(cleanup);

  test('Shows the correct text', () => {
    const { getByText, getAllByText } = render(
      <BrowserRouter>
        <AccordionItem heading="Heading" count={2}>
          <div>Body</div>
        </AccordionItem>
      </BrowserRouter>,
    );
    const heading = getAllByText('Heading');
    expect(heading).toHaveLength(2);
    expect(getByText('2')).toBeInTheDocument();
    expect(getByText('Body')).toBeInTheDocument();
  });

  test('Adds the isActive class onclicking the header', () => {
    const { getByTestId, getAllByText } = render(
      <BrowserRouter>
        <AccordionItem heading="Heading" count={2}>
          <div>Body</div>
        </AccordionItem>
      </BrowserRouter>,
    );

    expect(getByTestId('accordion-item')).toHaveClass('c-accordion-item');

    const heading = getAllByText('Heading');

    fireEvent.click(heading[0]);

    expect(getByTestId('accordion-item')).toHaveClass('c-accordion-item isActive');
  });
});
