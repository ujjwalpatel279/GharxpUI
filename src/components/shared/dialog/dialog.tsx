import React, { FunctionComponent } from 'react';
import { Button } from '..';
import './dialog.scss';

interface DialogInterface {
  show: boolean;
  message: string;
  submit: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  handleClose: () => void;
}

export const Dialog: FunctionComponent<DialogInterface> = ({ show, message, submit, handleClose }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName + ' dialog'}>
      <section className="modal-main">
        <p>{message}</p>
        <Button type="button" variant="secondary" onClick={handleClose}>
          No
        </Button>
        <Button type="submit" variant="primary" onClick={submit}>
          Yes
        </Button>
      </section>
    </div>
  );
};
