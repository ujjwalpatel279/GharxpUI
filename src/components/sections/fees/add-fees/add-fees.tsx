import { services } from '../../../../shared';
import { GridColumn, GridRow } from '../../../shared/grid/grid';
import React, { FunctionComponent, ReactElement, useState, useEffect } from 'react';
import { FeeInterface } from '../../../../shared/models';
import { Button, Grid, Heading, Icon, InputCheckbox } from '../../../shared';

import './add-fees.scss';
import { WorldPay } from '../../worldpay/worldpay';

export enum FeeType {
  AddToLoan,
  PayableNow,
}

interface AddFeesProps {
  caseId: number;
  formId: number;
  feeData?: FeeInterface[];
  heading: string;
  noRowsMessage: string;
  feeType: FeeType;
  reloadGrids?: (caseId: number, formId: number) => void;
}

export const AddFees: FunctionComponent<AddFeesProps> = ({
  caseId,
  formId,
  feeData,
  heading,
  noRowsMessage,
  feeType,
  reloadGrids,
}): ReactElement => {
  const [feesToAdd, setFeesToAdd] = useState<FeeInterface[]>([]);
  const [fees, setFees] = useState<FeeInterface[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>();

  const [exceedsMaximumFeeLimit, setExceedsMaximumFeeLimit] = useState<boolean>(false);
  const columns: GridColumn[] = [
    {
      id: 'name',
      description: 'Fee Name',
    },
    {
      id: 'amount',
      description: 'Fee amount',
      render(column: GridColumn, row: GridRow) {
        return <span>£{parseInt(row[column.id]).toPrecision(2).toString()}</span>;
      },
    },
    {
      id: 'selected',
      description: 'Select',
      sort: false,
      render(column: GridColumn, row: GridRow) {
        if (feeType === FeeType.AddToLoan)
          return row[column.id] ? (
            <Icon name="tick" colour="primary" />
          ) : (
            <InputCheckbox
              id={`checkbox-${row['feeId']}`}
              defaultValue={false}
              dataValue={row['feeId']}
              onToggle={submit}
            />
          );

        if (feeType === FeeType.PayableNow)
          return row['isPaid'] ?? false ? (
            <Icon name="tick" />
          ) : (
            <InputCheckbox
              id={`checkbox-${row['feeId']}`}
              defaultValue={false}
              dataValue={row['feeId']}
              onToggle={submit}
            />
          );
      },
    },
    {
      id: 'remove',
      description: 'Remove',
      sort: false,
      hidden: feeType === FeeType.PayableNow,
      render(_column: GridColumn, row: GridRow) {
        return (
          <Button type="button" variant="bare" disabled={!row['selected']} dataValue={row['feeId']} onClick={remove}>
            <Icon name="close" colour="primary" />
          </Button>
        );
      },
    },
  ];

  const remove: (e: React.MouseEvent<HTMLButtonElement>) => void = (e) => {
    const feeId = Number(e.currentTarget.getAttribute('data-value') ?? '0');
    const addedFee = fees.find((fee) => fee.feeId === feeId);
    if (addedFee)
      services.removeFee(caseId, formId, addedFee.loanToValueFeeId).finally(async () => {
        setFeesToAdd([]);
        reloadGrids(caseId, formId);
      });
  };

  const submit: (e: React.ChangeEvent<HTMLButtonElement>) => void = (e) => {
    const feeId = Number(e.currentTarget.getAttribute('data-value') ?? '0');
    const addedFee = fees.find((fee) => fee.feeId === feeId);
    const feeToAddIndex = feesToAdd.findIndex((fee) => fee.feeId === feeId);
    const currentList = [...(feesToAdd || [])];
    if (feeToAddIndex < 0) {
      currentList.push(addedFee);
    } else {
      currentList.splice(feeToAddIndex, 1);
    }
    setFeesToAdd(currentList);
    setExceedsMaximumFeeLimit(currentList.length > 0 && formatFees(currentList, true) > addedFee.maximumAddableFee);
  };

  const saveFees: (e: React.MouseEvent<HTMLButtonElement>) => void = () => {
    if (feesToAdd.length > 0)
      services.saveFee(caseId, formId, feesToAdd).finally(async () => {
        setFeesToAdd([]);
        reloadGrids(caseId, formId);
      });
  };

  const hideModal = () => {
    setModalVisible(false);
    setFeesToAdd([]);
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const formatFees = (feeOptions: FeeInterface[], all?: boolean) => {
    if (feeOptions && feeOptions.length < 1) return 0;
    if (feeType === FeeType.AddToLoan)
      return feeOptions
        ?.map((fee) => (fee.selected || all ? fee.amount : 0))
        .reduce((prev, next) => (prev ?? 0) + next);
    if (feeType === FeeType.PayableNow)
      return feeOptions?.map((fee) => (fee.isPaid ? fee.amount : 0)).reduce((prev, next) => (prev ?? 0) + next);
  };

  useEffect(() => {
    setFees(feeData ?? []);
  }, [caseId, formId, feeType, feeData]);

  return (
    <div className="u-mb-2 c-add-fee">
      {feesToAdd && feeType === FeeType.PayableNow && (
        <WorldPay
          fees={feesToAdd}
          show={modalVisible}
          handleClose={hideModal}
          reloadGrids={reloadGrids}
          caseId={caseId}
          formId={formId}
        ></WorldPay>
      )}
      <div className="u-mb-2">
        <Heading level="h3" title={heading} mb={4} />
        <Grid rowData={fees} columns={columns} noRowsMessage={noRowsMessage} />
      </div>
      {feeType === FeeType.AddToLoan && (
        <div className="c-add-fee__summary">
          {exceedsMaximumFeeLimit ? <p> You&lsquo;ve exceeded the amount that can be added to a loan </p> : undefined}
          <b>You have added £{formatFees(fees)} to the loan amount.</b>
          {fees?.find((fee) => fee.selected === false) ? (
            <Button
              variant="primary"
              type="button"
              onClick={saveFees}
              childClasses="u-ml-2"
              disabled={exceedsMaximumFeeLimit || feesToAdd.length < 1}
            >
              Add Fees to Loan
            </Button>
          ) : undefined}
        </div>
      )}

      {feeType === FeeType.PayableNow && (
        <div className="u-flex">
          <p className="u-flex__align-right">
            <b>You have paid £{formatFees(fees)} in fees.</b>
          </p>

          <Button
            variant="primary"
            type="button"
            onClick={showModal}
            childClasses="u-flex__align-right"
            disabled={feesToAdd?.length < 1}
          >
            Pay Now
          </Button>
        </div>
      )}
    </div>
  );
};
