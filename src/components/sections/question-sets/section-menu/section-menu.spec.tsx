import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { PageInterface } from './page.model';
import { SectionMenu } from './section-menu';
import { BrowserRouter } from 'react-router-dom';
import { ApplicationFormStatus } from '../../../../shared/types/enums';

describe('Page and Section Menu', () => {
  afterEach(cleanup);

  const mockFn = jest.fn();

  const PageName = 'test';
  const SectionName = 'TestQuestion';
  const mockLocation = {
    state: {
      loanPurposeId: 241,
      applicants: [
        {
          addressId: 1,
          correspondenceAddressID: 2,
          applicationApplicantId: 1,
          created: '',
          customerId: 123,
          dateOfBirth: 'string',
          email: 'string',
          firstName: 'Tom',
          id: '123',
          isMainApplicant: true,
          mobileNumber: '',
          proVisionCustomerId: 1,
          surname: 'Hanks',
          telephone: '',
          titleID: 2,
          workNumber: '',
        },
      ],
    },
  };
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
  test('Show Page and Section', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <SectionMenu pages={mockPages} rootPath="" location={mockLocation} workflowName="step1" closeMenu={mockFn} />
      </BrowserRouter>,
    );
    expect(getByText(PageName)).toBeInTheDocument();
    expect(getByText(SectionName)).toBeInTheDocument();
  });
  test('Show Complete works', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <SectionMenu pages={mockPages} rootPath="" location={mockLocation} workflowName="step1" closeMenu={mockFn} />
      </BrowserRouter>,
    );
    expect(getByText(SectionName).parentElement.className).toContain('isComplete');
  });
  test('Show Section link Works', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <SectionMenu pages={mockPages} rootPath="" location={mockLocation} workflowName="step1" closeMenu={mockFn} />
      </BrowserRouter>,
    );
    await getByText(SectionName).click();
    expect(global.window.location.pathname).toContain(`${mockPages[0].id}/${mockPages[0].sections[0].id}`);
  });
  test('Show Page link Works', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <SectionMenu pages={mockPages} rootPath="" location={mockLocation} workflowName="step1" closeMenu={mockFn} />
      </BrowserRouter>,
    );
    await getByText(PageName).click();
    expect(global.window.location.pathname).toContain(`${mockPages[0].id}/${mockPages[0].sections[0].id}`);
  });
});
