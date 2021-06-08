import React, { FunctionComponent, ReactElement } from 'react';

import { PageHeading } from '../../shared';

export const LendingCriteriaPage: FunctionComponent = (): ReactElement => (
  <section>
    <PageHeading headingLevel={2} title="Lending Criteria" icon="lendingcriteria" mb={6} />
  </section>
);
