import { Button, Container, Section } from '../../shared';
import React, { FunctionComponent, MouseEvent, useState } from 'react';
import { tabInterface } from './tab/tab';
import './tabs.scss';

interface tabsInterface {
  id: string;
}

export const Tabs: FunctionComponent<tabsInterface> = ({ id, children }) => {
  const [selectedTab, setSelectedTab] = useState<string>();

  const toggleTab = (e: MouseEvent<HTMLButtonElement>) => {
    const tab = e.currentTarget.getAttribute('data-value');
    setSelectedTab(tab);
  };
  const activeTab =
    selectedTab ?? ((React.Children.toArray(children)[0] as React.ReactElement).props as tabInterface).title;
  return (
    <Section
      headerChildren={
        <>
          {React.Children.map(children, (child) => {
            const tab = (child as React.ReactElement).props as tabInterface;
            let extendedClass = 'c-tab-header';
            if (tab.title == activeTab) {
              extendedClass += ' active';
            }
            return (
              <span className={extendedClass}>
                <Button
                  key={`tab-button-${tab.title}`}
                  icon={tab.icon}
                  iconPosition="left"
                  variant="bare"
                  type="button"
                  onClick={toggleTab}
                  dataValue={tab.title}
                >
                  <span>{tab.title}</span>
                  {tab.showNotification == true && <span className={`badge ${tab.extendNotificationClass}`}></span>}
                </Button>
              </span>
            );
          })}
        </>
      }
    >
      {React.Children.map(children, (child) => {
        const tab = (child as React.ReactElement).props as tabInterface;
        let extendedClass = 'c-tab-item';
        if (tab.title == activeTab) {
          extendedClass += ' active';
        }
        return <Container extendClass={extendedClass}> {child} </Container>;
      })}
    </Section>
  );
};
