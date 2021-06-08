import React, { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form/dist/index.ie11';

import { Container, PageHeading, Section, Heading, Input, FormField, Button, InputList } from '../../shared';

import { services, validation } from '../../../shared';
import { TitleInterface } from '../../../shared/models';
import { BrokerInterface } from '../../app/Broker.model';

import './profile.scss';

type Inputs = {
  jobTitle: number;
  firstName: string;
  lastName: string;
  contactNumber: string;
};

export const ProfilePage: FunctionComponent = (): ReactElement => {
  const [jobTitles, setJobTitles] = useState<TitleInterface[] | []>([]);
  const [brokerDetail, setBrokerDetail] = useState<BrokerInterface>();
  const { register, handleSubmit, setValue, formState, errors } = useForm<Inputs>({
    defaultValues: {
      firstName: brokerDetail?.name?.split(' ')[0] ?? '',
      lastName: brokerDetail?.name?.split(' ')[1] ?? '',
      contactNumber: brokerDetail?.telephone,
      jobTitle: brokerDetail?.jobTitleId,
    },
  });

  const fetchJobTitles = async () => {
    const res = (await services.getjobTitles()).data;
    setJobTitles(res);
  };

  const getBrokerDetail = async () => {
    const res = (await services.getBroker()).data;
    setBrokerDetail(res);
  };

  const onSubmit = async (data: Inputs) => {
    const broker: BrokerInterface = {
      ...brokerDetail,
      name: `${data.firstName} ${data.lastName}`,
      jobTitleId: Number(data.jobTitle),
      telephone: data.contactNumber,
    };
    await services.UpdateBroker(broker);
  };

  useEffect(() => {
    getBrokerDetail();
    fetchJobTitles();
  }, []);

  return (
    <>
      <PageHeading headingLevel={2} title="Profile" icon="user" mb={6} />
      <Container extendClass="c-profile-form">
        <Section headerChildren={<Heading level={'h2'} title={'Personal Details'} />}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <fieldset>
              <legend>Personal Details</legend>

              <FormField id="firstName" label="First Name" error={errors.firstName && validation.firstName.message}>
                <Input
                  id="firstName"
                  value={brokerDetail?.name?.split(' ')[0] ?? ''}
                  setValue={setValue}
                  error={!!errors.firstName}
                  required={validation.firstName.types.required}
                  ref={register(validation.firstName.types)}
                />
              </FormField>

              <FormField id="lastName" label="Last name" error={errors.lastName && validation.lastName.message}>
                <Input
                  id="lastName"
                  value={brokerDetail?.name?.split(' ')[1] ?? ''}
                  setValue={setValue}
                  error={!!errors.lastName}
                  required={validation.lastName.types.required}
                  ref={register(validation.lastName.types)}
                />
              </FormField>

              <FormField label="Job Title" error={errors.jobTitle && validation.title.message}>
                <InputList
                  id="jobTitle"
                  options={jobTitles}
                  value={brokerDetail?.jobTitleId.toString()}
                  setValue={setValue}
                  legend="Select a Jobtitle"
                  error={!!errors.jobTitle}
                  required={validation.title.types.required}
                  ref={register(validation.title.types)}
                />
              </FormField>

              <FormField
                id="contactNumber"
                label="Mobile Number"
                error={errors.contactNumber && validation.contactNumber.message}
              >
                <Input
                  type="tel"
                  id="contactNumber"
                  value={brokerDetail?.telephone}
                  setValue={setValue}
                  required={validation.contactNumber.types.required}
                  error={!!errors.contactNumber}
                  ref={register(validation.contactNumber.types)}
                />
              </FormField>

              <Button type="submit" variant="primary" childClasses="u-mr-2" disabled={!formState.isDirty}>
                Update details
              </Button>
            </fieldset>
          </form>
        </Section>
      </Container>
    </>
  );
};
