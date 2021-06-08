import React, { FunctionComponent, useState } from 'react';

import { Icon } from '..';

import './accordion-item.scss';

interface AccordionItemProps {
  heading: string;
  count?: number;
  mb?: number;
  extendClass?: string;
}

export const AccordionItem: FunctionComponent<AccordionItemProps> = ({ heading, count, mb, extendClass, children }) => {
  const [active, setActive] = useState(false);

  let AccordionItemClasses = 'c-accordion-item';

  if (active) {
    AccordionItemClasses += ' isActive';
  }

  if (mb) {
    AccordionItemClasses += ` u-mb-${mb}`;
  }

  const handleToggle = () => {
    setActive(!active);
  };

  return (
    <section data-testid="accordion-item" className={AccordionItemClasses}>
      <header>
        <h3>
          <button onClick={handleToggle} className="c-accordion-item__btn">
            <span>{heading}</span>
            <Icon name="chevronDown" />
            {count && <span>{count}</span>}
          </button>
          <span className="c-accordion-item__header">{heading}</span>
        </h3>
      </header>
      <div className={`c-accordion-item__body ${extendClass ?? ''}`}>{children}</div>
    </section>
  );
};
