import React, { useEffect, useState, FunctionComponent, ReactElement } from 'react';
import { HelpSection } from '../../sections';
import { services } from '../../../shared';
import { pageContentValues } from '../../../shared/types/constants';

export const HelpPage: FunctionComponent = (): ReactElement => {
  const [content, setContent] = useState<string>('');
  const [broker, setBroker] = useState<string>('');
  const version = process.env.REACT_APP_VERSION || '1.0.0';
  const fetchContent = async () => {
    const moduleText = (await services.getModuleText(pageContentValues.helpPage.content)).data;
    const broker = (await services.getBroker()).data;
    setBroker(broker.name);
    setContent(moduleText.description);
  };
  useEffect(() => {
    fetchContent();
  });
  return <HelpSection broker={broker} content={content} version={version} />;
};
