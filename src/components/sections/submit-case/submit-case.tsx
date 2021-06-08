import React, { FunctionComponent, MouseEvent, useEffect, useState } from 'react';
import { services } from '../../../shared';
import { ApplicationFormStatus, ApplicationStatus } from '../../../shared/types/enums';

import { Button, Icon } from '../../shared';
import { PageInterface } from '../question-sets/section-menu';

import './submit-case.scss';

interface SubmitInterface {
  formType: string;
  applicationStatus?: ApplicationStatus;
  moduleText?: string;
  submitFunction: (e: MouseEvent<HTMLButtonElement>) => void;
  caseId: number;
  formId: number;
  downloadCertificate?: (e: MouseEvent<HTMLButtonElement>) => void;
  pages: PageInterface[];
}

export const SubmitCase: FunctionComponent<SubmitInterface> = ({
  submitFunction,
  formType,
  applicationStatus,
  moduleText,
  caseId,
  formId,
  downloadCertificate,
  pages,
}) => {
  const [downloadFormUrl, setDownloadFormUrl] = useState<string>();
  const [downloadCertificateUrl, setDownloadCertificateUrl] = useState<string>();
  const [isDownloadCertificateAvailable, setDownloadCertificateAvailableOrNot] = useState<boolean>();

  useEffect(() => {
    services.getDownloadFormUrl().then((url) => {
      setDownloadFormUrl(url);
    });
    services.getDownloadCertificateUrl().then((url) => {
      setDownloadCertificateUrl(url);
    });
    services.isDipCertificateAvailable(caseId, formId).then((isAvailable) => {
      setDownloadCertificateAvailableOrNot(isAvailable.data);
    });
  }, [caseId, formId]);
  return (
    <div className="c-section__body">
      <div className="l-grid">
        <div className="l-grid_span-12 l-grid_span-12@bp20">
          {(() => {
            switch (applicationStatus) {
              case ApplicationStatus.Pending:
                return (
                  <>
                    <p className="c-submit-case">MV Building Society is reviewing your {formType} request </p>
                    <p className="c-submit-case">You will be notified of their decision by email.</p>
                    <div className="c-content-center">
                      <a href={downloadFormUrl + caseId + '/' + formId} target="_blank" rel="noreferrer">
                        <Button variant="primary" childClasses="c-submit-button" type="button">
                          {`Download ${formType ?? ''}`}
                        </Button>
                      </a>
                    </div>
                  </>
                );
              case ApplicationStatus.Referred:
              case ApplicationStatus.ReferredWaitingForMoreInfo:
              case ApplicationStatus.ReferredWithMoreInfoSubmited:
              case ApplicationStatus.CallValidateCallCreditRefer:
                return (
                  <>
                    <p className="c-submit-case">{moduleText}</p>
                    <div className="c-content-center">
                      <a href={downloadFormUrl + caseId + '/' + formId} target="_blank" rel="noreferrer">
                        <Button variant="primary" childClasses="c-submit-button" type="button">
                          {`Download ${formType ?? ''}`}
                        </Button>
                      </a>
                    </div>
                  </>
                );
              case ApplicationStatus.Declined:
              case ApplicationStatus.DeclinedWaitingForMoreInfo:
              case ApplicationStatus.DeclinedWithMoreInfoSubmited:
              case ApplicationStatus.AutoDeclineCancelled:
              case ApplicationStatus.AutoDeclined:
              case ApplicationStatus.AutoDeclinedWaitingForMoreInfo:
              case ApplicationStatus.AutoDeclinedWithMoreInfoSubmited:
                return (
                  <>
                    <p className="c-submit-case">{moduleText}</p>
                    <div className="c-submit-case">
                      <Icon name="close" size="large"></Icon>
                    </div>
                    <div className="c-content-center">
                      <a href={downloadFormUrl + caseId + '/' + formId} target="_blank" rel="noreferrer">
                        <Button variant="primary" childClasses="c-submit-button" type="button">
                          {`Download ${formType ?? ''}`}
                        </Button>
                      </a>
                    </div>
                  </>
                );
              case ApplicationStatus.Pass:
              case ApplicationStatus.Completed:
                return (
                  <>
                    <p className="c-submit-case">{moduleText}</p>
                    <div className="c-submit-case">
                      <Icon name="tick" size="large"></Icon>
                    </div>
                    <div className="c-content-center">
                      <a href={downloadFormUrl + caseId + '/' + formId} target="_blank" rel="noreferrer">
                        <Button variant="primary" childClasses="c-submit-button" type="button">
                          {`Download ${formType ?? ''} Form`}
                        </Button>
                      </a>
                      {isDownloadCertificateAvailable && (
                        <a href={downloadCertificateUrl + caseId + '/' + formId} target="_blank" rel="noreferrer">
                          <Button
                            variant="primary"
                            childClasses="c-submit-button"
                            type="button"
                            onClick={downloadCertificate}
                          >
                            {`Download ${formType ?? ''} Certificate`}
                          </Button>
                        </a>
                      )}
                    </div>
                  </>
                );
              case ApplicationStatus.NoStatus:
              case ApplicationStatus.Ready:
              case ApplicationStatus.Active:
                return (
                  <div>
                    <p className="c-submit-case">The {formType ?? ''} form is completed</p>
                    <p className="c-submit-case">
                      Would you like to submit this {formType ?? ''} request to the Society?
                    </p>
                    <div className="c-content-center">
                      <Button
                        variant="primary"
                        childClasses="c-submit-button"
                        type="button"
                        onClick={submitFunction}
                        disabled={pages?.some((page) => page.name != 'Submit' && !page.isComplete) ?? true}
                      >
                        {`Submit ${formType ?? ''}`}
                      </Button>
                    </div>
                  </div>
                );
            }
          })()}
        </div>
      </div>
    </div>
  );
};
