import { IconNames } from 'components/shared/icon/icon';
import React, { FunctionComponent } from 'react';
import './tab.scss';

export interface tabInterface {
  title: string;
  icon: IconNames;
  showNotification?: boolean;
  extendNotificationClass?: string;
}

export const Tab: FunctionComponent<tabInterface> = ({ title, children }) => {
  return <div key={`tab-${title}`}>{children}</div>;
};
