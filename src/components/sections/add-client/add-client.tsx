import React, { FunctionComponent, ReactElement } from 'react';
import { useForm } from 'react-hook-form/dist/index.ie11';

import { Button, FormField, InputList, Input, InputDob, InputAddress } from '../../shared';
import { services, validation } from '../../../shared';
import { TitleInterface, CustomerDetailInterface, AddressInterface } from '../../../shared/models';

import './add-client.scss';

interface AddClientProps {
  titles: TitleInterface[];
  handleCancel: (arg0: boolean) => void;
  fetchCustomers?: (searchTerm: string) => void;
}

type Inputs = {
  title: number;
  firstName: string;
  lastName: string;
  dobDay: string;
  dobMonth: string;
  dobYear: string;
  emailAddress: string;
  contactNumber: string;
  propertyName: string;
  road: string;
  town: string;
  county: string;
  postCode: string;
};

export const AddClient: FunctionComponent<AddClientProps> = ({
  titles,
  handleCancel,
  fetchCustomers,
}): ReactElement => {
  const { register, handleSubmit, setValue, errors, watch } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    const address: AddressInterface = {
      propertyName: data.propertyName,
      road: data.road,
      town: data.town,
      county: data.county,
      postCode: data.postCode,
    };
    const customerDetail: CustomerDetailInterface = {
      titleId: parseInt(data.title.toString()),
      firstName: data.firstName,
      surname: data.lastName,
      dateOfBirth: new Date(
        Date.UTC(parseInt(data.dobYear), parseInt(data.dobMonth) - 1, parseInt(data.dobDay)), // Note : Month start with 0 not 1, Hence -1
      ).toISOString(),
      email: data.emailAddress,
      mobileNumber: data.contactNumber,
      address: address,
      correspondenceAddress: address,
    };
    const res = await services.saveClient(customerDetail);
    if (res !== null) {
      handleCancel(false);
      fetchCustomers('');
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="c-add-client">
      <fieldset>
        <legend>Add a new client</legend>

        <FormField label="Title" error={errors.title && validation.title.message}>
          <InputList
            id="title"
            options={titles}
            legend="Select a title"
            forceSelection
            error={!!errors.title}
            required={validation.title.types.required}
            ref={register(validation.title.types)}
          />
        </FormField>

        <FormField id="firstName" label="First name" error={errors.firstName && validation.firstName.message}>
          <Input
            id="firstName"
            error={!!errors.firstName}
            required={validation.firstName.types.required}
            ref={register(validation.firstName.types)}
          />
        </FormField>

        <FormField id="lastName" label="Last name" error={errors.lastName && validation.lastName.message}>
          <Input
            id="lastName"
            error={!!errors.lastName}
            required={validation.lastName.types.required}
            ref={register(validation.lastName.types)}
          />
        </FormField>

        <FormField
          label="Date of birth"
          error={(errors.dobDay || errors.dobMonth || errors.dobYear) && validation.dob.message}
        >
          <InputDob register={register} required={validation.dob.types.required} errors={errors} name="dob" />
        </FormField>

        <InputAddress register={register} errors={errors} setValue={setValue} required={true} watch={watch} />

        <FormField
          id="emailAddress"
          label="Email address"
          error={errors.emailAddress && validation.emailAddress.message}
        >
          <Input
            type="email"
            id="emailAddress"
            required={validation.emailAddress.types.required}
            error={!!errors.emailAddress}
            ref={register(validation.emailAddress.types)}
          />
        </FormField>

        <FormField
          id="contactNumber"
          label="Contact number"
          error={errors.contactNumber && validation.contactNumber.message}
        >
          <Input
            type="tel"
            id="contactNumber"
            required={validation.contactNumber.types.required}
            error={!!errors.contactNumber}
            ref={register(validation.contactNumber.types)}
          />
        </FormField>

        <Button type="submit" variant="primary" childClasses="u-mr-2">
          Add new client
        </Button>
        <Button type="button" variant="bare" size="small" onClick={() => handleCancel(false)}>
          Cancel
        </Button>
      </fieldset>
    </form>
  );
};
