import React, { FunctionComponent, ReactElement, useEffect } from 'react';
import { ApplicationFormStatus, ApplicationStatus } from '../../../shared/types/enums';

import './pill.scss';

interface PillProps {
  status?: ApplicationStatus;
  formStatus?: ApplicationFormStatus;
  stageStatus?: ApplicationFormStatus;
}

export const Pill: FunctionComponent<PillProps> = ({ status, formStatus, stageStatus }): ReactElement => {
  const usedStatus = status
    ? ApplicationStatus[status]
    : formStatus
    ? ApplicationFormStatus[formStatus]
    : ApplicationStatus[stageStatus];

  const formatName = (apStat: ApplicationStatus | ApplicationFormStatus) => {
    switch (apStat) {
      case ApplicationStatus.AutoDeclineCancelled: //AutoDecisionDeclinedCancellation
      case ApplicationStatus.AutoDeclinedWaitingForMoreInfo:
      case ApplicationStatus.AutoDeclinedWithMoreInfoSubmited:
      case ApplicationStatus.AutoDeclined:
        return 'Auto Declined';

      case ApplicationStatus.ReferredWaitingForMoreInfo:
      case ApplicationStatus.ReferredWithMoreInfoSubmited:
      case ApplicationStatus.CallValidateCallCreditRefer:
        return 'Referred';

      case ApplicationStatus.DeclinedWaitingForMoreInfo:
      case ApplicationStatus.DeclinedWithMoreInfoSubmited:
      case ApplicationStatus.CallValidateCallCreditFail:
        return 'Declined';

      case ApplicationStatus.AutoRefer:
        return 'Auto Refer';

      default:
        return `${usedStatus}`;
    }
  };

  const displayName = formatName(status ?? formStatus ?? stageStatus);

  return <p className={`c-pill ${usedStatus}`}>{displayName}</p>;
};
