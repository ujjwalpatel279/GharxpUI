import { Button, Heading } from '../../../shared';
import React, { FunctionComponent, ReactElement, useState } from 'react';
import { services } from '../../../../shared';
import { ModuleTextInterface } from '../../../../shared/models';
import './announcement.scss';
interface AnnouncementInterface {
  isOpen: boolean;
  setToggle: (toggle: boolean) => void;
}

export const AnnouncementModal: FunctionComponent<AnnouncementInterface> = ({ isOpen, setToggle }): ReactElement => {
  const mouseClick = (event: any) => {
    if (!event?.target?.closest('.c-announcement')) {
      document.removeEventListener('click', mouseClick);
      setToggle(false);
    }
  };
  document.addEventListener('click', mouseClick);
  const [fetchedAnnouncement, setFetchedAnnouncement] = useState<ModuleTextInterface>();
  const [isReadMore, setReadMore] = useState<boolean>(false);
  const fetchAnnouncement = async () => {
    const announcementData = (await services.getModuleText('Broker_Announcement_Text')).data;
    setFetchedAnnouncement(announcementData);
  };

  const hasTextExceededMax = (announcement: ModuleTextInterface) => {
    return announcement?.description.length > 40;
  };

  if (!fetchedAnnouncement) {
    fetchAnnouncement();
  }

  const applyReadMore = () => {
    setReadMore(!isReadMore);
  };

  return (
    <section className="c-announcement-section" hidden={!isOpen}>
      <div className="speech-bubble">
        <div className="c-announcement-container__header">
          <Heading level="h3" title="Announcements" />
        </div>
        <div className="c-announcement-container__body">
          <div>
            <p>
              {isReadMore ? fetchedAnnouncement?.description : fetchedAnnouncement?.description.substr(0, 40)}
              {hasTextExceededMax(fetchedAnnouncement) && !isReadMore ? '...' : ''}
            </p>
          </div>
          <div>
            <Button
              type="button"
              variant="bare"
              childClasses={hasTextExceededMax(fetchedAnnouncement) ? 'btn-see-more' : 'btn-see-more hidden-label'}
              onClick={applyReadMore}
            >
              {isReadMore ? 'See less' : 'See more'}
            </Button>
          </div>
          <div className="c-announcement-date">
            <small>{fetchedAnnouncement?.lastUpdateDate}</small>
          </div>
        </div>
      </div>
    </section>
  );
};
