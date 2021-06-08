import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';

import { services } from '../../../shared';

import { Button } from '../../shared';

interface CompleteCaseInterface {
  show: boolean;
  societyName: string;
  handleClose: () => void;
}

interface UrlParamInterface {
  caseId?: string;
  loanPurposeId?: string;
}

export const CompleteCase: FunctionComponent<CompleteCaseInterface> = ({ show, societyName, handleClose }) => {
  const { caseId, loanPurposeId } = useParams<UrlParamInterface>();
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  const submit = () => {
    services.submitCase(Number(caseId), Number(loanPurposeId)).finally(() => {
      handleClose();
    });
  };

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <p>Submit case to {societyName}?</p>
        <Button type="button" variant="primary" onClick={handleClose}>
          No
        </Button>
        <Button type="submit" variant="primary" onClick={submit}>
          Yes
        </Button>
      </section>
    </div>
  );
};
