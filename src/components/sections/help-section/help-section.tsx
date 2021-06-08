import React, { FunctionComponent, ReactElement } from 'react';
import { Container, PageHeading, Section } from '../../shared';
import Markdown from 'react-markdown';

import './help.section.scss';

export interface HelpSectionProps {
  content: string;
  broker: string;
  version: string;
}
export const HelpSection: FunctionComponent<HelpSectionProps> = ({ content, broker, version }): ReactElement => (
  <section>
    <PageHeading headingLevel={2} title="Help" icon="question" />
    <Container>
      <div className="help-section">
        <Section
          title="Need help?"
          headerChildren={
            <div>
              <b>
                {broker} {version}
              </b>
            </div>
          }
        >
          <Markdown source={content} />
        </Section>
      </div>
    </Container>
  </section>
);
