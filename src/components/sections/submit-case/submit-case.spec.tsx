import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { SubmitCase } from './submit-case';
import { ApplicationFormStatus, ApplicationStatus } from '../../../shared/types/enums';
import { PageInterface } from '../question-sets/section-menu';

describe('Submit Case Component', () => {
  afterEach(cleanup);

  const PageName = 'test';
  const SectionName = 'TestQuestion';
  const mockPages: PageInterface[] = [
    {
      id: 16,
      alternateText: PageName,
      name: PageName,
      helpText: '',
      validationScript: '',
      rowOrder: 0,
      showOnAffordabilityRefer: false,
      showOnAffordabilityDecline: false,
      showOnQuestionBasedAutoDecline: false,
      applicationFormStatus: ApplicationFormStatus.NoData,
      sections: [
        {
          id: 576,
          allowMultiple: false,
          alternativeText: SectionName,
          forceRequired: false,
          helpText: 'A test section',
          name: SectionName,
          rowOrder: 1,
          validationScript: '',
          verticalLayout: false,
          isFollowedByPageBreak: false,
          questions: undefined,
          lists: undefined,
          applicationFormStatus: ApplicationFormStatus.Complete,
          answers: undefined,
        },
      ],
    },
  ];

  test('Shows correct form text', () => {
    const { getByText } = render(
      <BrowserRouter>
        <SubmitCase
          formType="test"
          applicationStatus={ApplicationStatus.Completed}
          moduleText="The Form is Completed"
          submitFunction={() => null}
          downloadCertificate={() => null}
          caseId={1}
          formId={1}
          pages={mockPages}
        />
      </BrowserRouter>,
    );

    expect(getByText('The Form is Completed')).toBeInTheDocument();
    expect(getByText('Download test Form')).toBeInTheDocument();
  });
});
