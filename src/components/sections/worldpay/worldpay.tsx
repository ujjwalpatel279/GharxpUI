import React, { FunctionComponent, useEffect, useState } from 'react';
import { Button, FormField, Heading, Input, InputList } from '../../shared';
import { useForm } from 'react-hook-form';

import { defaultErrorResponse, hasError, ServiceHandlingInterface } from '../../../shared/types/service-handling';

import './worldpay.scss';

import {
  FeeInterface,
  ListItemInterface,
  WorldPayOrderInterface,
  WorldPayResponseInterface,
} from '../../../shared/models';
import { services } from '../../../shared';

export interface WorldPayInterface {
  handleClose: () => void;
  show: boolean;
  fees: FeeInterface[];
  reloadGrids?: (caseId: number, formId: number) => void;
  caseId: number;
  formId: number;
}

type Inputs = {
  emailAddress: string;
  addressLine1: string;
  city: string;
  postcode: string;
  countryCode: string;
  reference: string;
};

export const worldPaySubmitInitialState: ServiceHandlingInterface<WorldPayResponseInterface> = {
  data: undefined,
  loading: false,
  error: false,
};

export const WorldPay: FunctionComponent<WorldPayInterface> = ({
  handleClose,
  show,
  fees,
  reloadGrids,
  caseId,
  formId,
}) => {
  const [worldPayError, setWorldPayError] = useState<string>('');
  const [worldPayWindow, setWorldPayWindow] = useState<Window>(null);
  const [connection, setConnection] = useState(null);
  const [shWorldPaySubmit, setShWorldPaySubmit] = useState<ServiceHandlingInterface<WorldPayResponseInterface>>(
    worldPaySubmitInitialState,
  );

  const { register, handleSubmit, setValue, errors } = useForm<Inputs>();
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  const countries: ListItemInterface[] = [
    {
      id: -1,
      value: 'GB',
      code: 'GB',
      displayText: 'United Kingdom',
    },
    {
      id: -2,
      value: 'US',
      code: 'US',
      displayText: 'United States',
    },
  ];

  const validation = {
    emailAddress: {
      types: { required: true, pattern: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/ },
      message: `Please enter an email address`,
    },
    addressLine1: {
      types: { required: true },
      message: `Please enter a billing address`,
    },
    city: {
      types: { required: true },
      message: `Please enter a city`,
    },
    postcode: {
      types: { required: true },
      message: `Please enter a postcode`,
    },
    countryCode: {
      types: { required: true },
      message: `Please enter a country`,
    },
    reference: {
      types: { required: true },
      message: `Please enter a reference`,
    },
  };

  const startCheckingForPaymentStatus = async (worldPayOrder: WorldPayOrderInterface): Promise<string> => {
    setShWorldPaySubmit({ ...shWorldPaySubmit, loading: true });
    const response = await services.submitWorldPayOrder(caseId, formId, worldPayOrder);
    setShWorldPaySubmit(response);

    if (response.data && response.data.isOrderSucceeded && (response.data.redirectionUrl ?? '').length > 0) {
      const newConnection = services.getHubConnection();
      setConnection(newConnection);
    }
    return response.data.isOrderSucceeded ? response.data.redirectionUrl : '';
  };

  const sendToWorldPay = async (data: Inputs) => {
    const worldPayOrder: WorldPayOrderInterface = {
      emailAddress: data.emailAddress,
      addressLine1: data.addressLine1,
      city: data.city,
      postcode: data.postcode,
      countryCode: data.countryCode,
      reference: data.reference,
      fees: fees,
      amount: fees.map((fee) => fee.amount).reduce((acc, next) => (acc ?? 0) + next),
    };

    const redirectUrl = await startCheckingForPaymentStatus(worldPayOrder);
    if ((redirectUrl ?? '').length > 0) {
      const wpw = window.open(`/worldpay/?${redirectUrl}`, '_blank');
      setWorldPayWindow(wpw);
      setWorldPayError('Processing worldpay payment...');
    } else {
      setWorldPayError('Payment could not be processed');
    }
  };

  useEffect(() => {
    if (connection) {
      connection.start().then(() => {
        connection.invoke('getConnectionId').then(function (connectionId: string) {
          // Send the connectionId to controller
        });
        connection.on('paymentProcessed', (message: string) => {
          if (worldPayWindow !== null) {
            worldPayWindow.close();
          }
          reloadGrids(caseId, formId);
          handleClose();
          connection.stop();
        });
      });
    }
  }, [connection]);

  if (hasError([shWorldPaySubmit])) {
    return defaultErrorResponse();
  }

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <Heading level="h3" title="Client Contact Details" />
        <br />

        <form onSubmit={handleSubmit(sendToWorldPay)}>
          {worldPayError && (
            <p role="alert" className="c-form-field__error">
              {worldPayError}
            </p>
          )}
          <FormField label="Email Address" error={errors.emailAddress && validation.emailAddress.message}>
            <Input
              id="emailAddress"
              placeHolder="Email address"
              error={!!errors.emailAddress}
              ref={register(validation.emailAddress.types)}
            />
          </FormField>
          <FormField label="Address Line 1" error={errors.addressLine1 && validation.addressLine1.message}>
            <Input
              id="addressLine1"
              placeHolder="Address Line 1"
              error={!!errors.addressLine1}
              ref={register(validation.addressLine1.types)}
            />
          </FormField>
          <FormField label="City" error={errors.city && validation.city.message}>
            <Input id="city" placeHolder="City" error={!!errors.city} ref={register(validation.city.types)} />
          </FormField>
          <FormField label="Postcode" error={errors.postcode && validation.postcode.message}>
            <Input
              id="postcode"
              placeHolder="Postcode"
              error={!!errors.postcode}
              ref={register(validation.postcode.types)}
            />
          </FormField>
          <FormField label="Country" error={errors.countryCode && validation.countryCode.message}>
            <InputList
              id="countryCode"
              options={countries}
              legend="Select a country"
              forceSelection
              error={!!errors.countryCode}
              ref={register(validation.countryCode.types)}
            />
          </FormField>
          <FormField label="Reference" error={errors.reference && validation.reference.message}>
            <Input
              id="reference"
              placeHolder="Reference"
              error={!!errors.reference}
              ref={register(validation.reference.types)}
            />
          </FormField>
          <Button type="button" variant="navy" size="small" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" childClasses="upload-button" variant="primary" size="small">
            Pay
          </Button>
        </form>
      </section>
    </div>
  );
};
