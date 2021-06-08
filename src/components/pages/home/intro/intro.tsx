import React, { FunctionComponent, ReactElement, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { LOANPURPOSE } from '../../../../config/routes';

import { Heading } from '../../../shared';

import './intro.scss';

export const Intro: FunctionComponent = (): ReactElement => {
  const [title, setTitle] = useState<string>(null);
  const [subText, setText] = useState<string>(null);

  useEffect(() => {
    //TODO: For now set texts static, In the future we can update the hooks with an API response.
    setTitle(`Welcome to GharXp Online tool`);
    setText(`Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print,
    graphic or web designs. The passage is attributed to an unknown typesetter in the 15th
    century who is thought to have scrambled parts of De Finibus Bonorum et Malorum for use
    in a type specimen book.`);
  }, []);

  return (
    <div className="c-intro">
      <Heading level="h1" title={title} mb={4} />
      <p className="u-mb-4">{subText}</p>

      {/* <Link to={LOANPURPOSE.path} className="c-btn c-btn--primary">
        Start New Case
      </Link> */}
    </div>
  );
};
