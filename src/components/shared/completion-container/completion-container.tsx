import React, { FunctionComponent } from 'react';

import './completion-container.scss';

interface CompletionContainerProps {
  heading: string;
  text: string;
}

export const CompletionContainer: FunctionComponent<CompletionContainerProps> = ({ children, heading, text }) => {
  return (
    <section className="c-completion-container">
      <div className="c-completion-container__body">
        <h2 className="u-mb-3">{heading}</h2>
        <p>{text}</p>
      </div>

      <div className="c-completion-container__footer">{children}</div>
    </section>
  );
};
