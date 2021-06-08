import React from 'react';

import { render, cleanup } from '@testing-library/react';

import { Grid } from './grid';
import { Button } from '../button/button';

describe('Grid Component', () => {
  afterEach(cleanup);

  const mockData = [
    {
      id: 1,
      value: 'record 1',
    },
    {
      id: 2,
      value: 'record 2',
    },
  ];

  const mockColumns = [
    {
      id: 'id',
      description: 'id',
    },
    {
      id: 'value',
      description: 'value',
    },
  ];

  it('render data to Grid', () => {
    const { getByText } = render(<Grid rowData={mockData} columns={mockColumns} />);
    // Check column names are visible
    expect(getByText(mockColumns[0].description)).toBeInTheDocument();
    expect(getByText(mockColumns[1].description)).toBeInTheDocument();
    // Check data is visible
    expect(getByText(mockData[0].value)).toBeInTheDocument();
  });

  it('Show Select Buttons', async () => {
    const mockEvent = jest.fn();
    const { findAllByText } = render(<Grid columns={mockColumns} rowData={mockData} selectFunction={mockEvent} />);
    const allSelectButtons = await findAllByText('Select');
    const firstButton = allSelectButtons[1];
    firstButton.click();
    expect(allSelectButtons).toHaveLength(mockData.length + 1); // Adds one because of the header containing select
    expect(mockEvent).toHaveBeenCalled();
  });

  it('Show Sort Icon', async () => {
    const { getByText } = render(<Grid columns={mockColumns} rowData={mockData} />);
    (await getByText('id')).click();
    expect(getByText('id')).toBeInTheDocument();
  });

  it('Shows no data message', () => {
    const { getByText } = render(<Grid columns={mockColumns} />);
    expect(getByText('No rows available')).toBeInTheDocument();
  });

  it('Shows custom no data message', () => {
    const customMessage = 'I`m a test';
    const { getByText } = render(<Grid columns={mockColumns} noRowsMessage={customMessage} />);
    expect(getByText(customMessage)).toBeInTheDocument();
  });

  it('Shows custom node element', () => {
    const customMessage = 'Button test';
    const button = (
      <Button variant="primary" type="button">
        {customMessage}
      </Button>
    );
    const { getByText } = render(<Grid columns={mockColumns} noRowsMessage={button} />);
    expect(getByText(customMessage)).toBeInTheDocument();
    expect(typeof getByText(customMessage).parentElement).toBe(typeof button);
  });

  it('show headers hides column headers', () => {
    const { getByText } = render(<Grid rowData={mockData} columns={mockColumns} showHeaders={false} />);
    // Check column names are not visible
    expect(getByText(mockColumns[0].description)).not.toBeVisible();
    expect(getByText(mockColumns[1].description)).not.toBeVisible();
    // Check data is visible
    expect(getByText(mockData[0].value)).toBeInTheDocument();
  });
});
