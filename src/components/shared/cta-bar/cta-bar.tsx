import React, { FunctionComponent, ReactElement } from 'react';

import './cta-bar.scss';

export const CtaBar: FunctionComponent = ({ children }): ReactElement => <div className="c-cta-bar">{children}</div>;
