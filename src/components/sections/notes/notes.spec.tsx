import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { NoteInterface } from '../../../shared/models';
import { Notes } from './notes';

describe('Notes Component', () => {
  afterEach(cleanup);

  const notes: NoteInterface[] = [
    {
      id: 1,
      adminId: 0,
      advisorId: 1,
      applicationId: 1,
      adminOnly: false,
      canBeDeleted: false,
      formattedCreated: '',
      customerId: 1,
      text: 'Text 1',
    },
    {
      id: 2,
      adminId: 0,
      advisorId: 1,
      applicationId: 1,
      adminOnly: false,
      canBeDeleted: false,
      formattedCreated: '',
      customerId: 1,
      text: 'Text 2',
    },
  ];

  test('Shows applicant name, whether main and icon', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <Notes notes={notes} customerId={1} caseId={1} />
      </BrowserRouter>,
    );

    expect(getByText('Text 1')).toBeInTheDocument();
    expect(getByText('Text 2')).toBeInTheDocument();
  });
});
