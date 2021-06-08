import React, { FunctionComponent, ReactElement } from 'react';

import './section.scss';

interface SectionProps {
  title?: string;
  headerChildren?: ReactElement;
  mb?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
}

export const Section: FunctionComponent<SectionProps> = ({ title, headerChildren, children, mb }): ReactElement => {
  let sectionClasses = 'c-section';

  if (mb) {
    sectionClasses += ` u-mb-${mb}`;
  }

  return (
    <section className={sectionClasses}>
      <header className="c-section__header">
        <h3>{title}</h3>
        {headerChildren}
      </header>
      <div className="c-section__body">{children}</div>
    </section>
  );
};
