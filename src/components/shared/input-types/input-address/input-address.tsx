import React, { ReactElement, ChangeEvent, useState, FunctionComponent, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form/dist/index.ie11';

import { FormField, Button, Input, InputSelect } from '../../';
import { AddressListInterface } from '../../../../shared/models';

import { services } from '../../../../shared/api/services';

import './input-address.scss';

interface OptionsInterface {
  id: string;
  value: string;
}

interface InputAddressProps {
  register?: ReturnType<typeof useForm>['register'];
  errors?: ReturnType<typeof useForm>['errors'];
  setValue?: ReturnType<typeof useForm>['setValue'];
  watch?: ReturnType<typeof useWatch>['watch'];
  value?: string;
  required?: boolean;
  name?: string;
  disabled?: boolean;
}

export const InputAddress: FunctionComponent<InputAddressProps> = ({
  register,
  setValue,
  errors,
  watch,
  value,
  required,
  name,
  disabled,
}): ReactElement => {
  const [addressSelection, setAddressSelection] = useState<OptionsInterface[]>(null);
  const [postCode, setPostCode] = useState(null);
  const [addressDetails, setAddressDetails] = useState<AddressListInterface>(null);
  const [showPostCodeLookup, toggleShowPostCodeLookup] = useState<boolean>(true);
  const [showManualAddress, toggleShowManualAddress] = useState<boolean>(false);
  const [propertyName, setPropertyName] = useState<string>();
  const [propertyNumber, setPropertyNumber] = useState<string>();
  const [road, setRoad] = useState<string>();
  const [town, setTown] = useState<string>();
  const [county, setCounty] = useState<string>();
  const [postcode, setPostcode] = useState<string>();

  const handleManualAddressView = () => {
    toggleShowPostCodeLookup(!showPostCodeLookup);
    toggleShowManualAddress(!showManualAddress);
  };

  const handleFetchAddressList = async (postCode: string) => {
    const res = (await services.getAddressList(postCode.replace(' ', ''), `Postcode`)).data;
    const addresses = res.map((items: AddressListInterface) => {
      return { id: items.sid, value: items.itemText };
    });
    setAddressSelection(addresses);
  };

  const handleFindAddress = (): void => {
    setAddressSelection(null);
    setAddressSelection(null);
    toggleShowManualAddress(false);

    if (postCode) {
      handleFetchAddressList(postCode);
    }
    return;
  };

  const handlePostCodeEntry = (e: ChangeEvent<HTMLInputElement>): void => {
    setPostCode(e.currentTarget.value);
  };

  const formatId = (id: string, name: string) => {
    return name ? `${name}-` : id;
  };
  const requiredToggle = watch ? watch([formatId('propertyName', name), formatId('propertyNumber', name)]) : null;

  useEffect(() => {
    if (value) {
      services.getAddress(Number(value)).then((result) => {
        setPropertyName(result.data.propertyName);
        setPropertyNumber(result.data.propertyNumber);
        setRoad(result.data.road);
        setTown(result.data.town);
        setCounty(result.data.county);
        setPostcode(result.data.postCode);
        toggleShowPostCodeLookup(false);
        toggleShowManualAddress(true);
      });
    }
  }, [value]);

  const handleAddressSelection = async (e: ChangeEvent<HTMLSelectElement>) => {
    const addressDetails = await (await services.getAddressDetail(e.currentTarget.value, 'Sid')).data;

    setAddressDetails(addressDetails);
    toggleShowManualAddress(true);

    setPropertyName(addressDetails.houseName2);
    setPropertyNumber(addressDetails.houseName1);
    setRoad(addressDetails.streetName1);
    setTown(addressDetails.town);
    setCounty(addressDetails.county);
    setPostcode(addressDetails.postcode);
  };

  return (
    <fieldset className="c-input-address">
      <legend>Address</legend>
      {showPostCodeLookup && (
        <FormField
          id={formatId('postCodeLookup', name)}
          label="Post code"
          error={errors[formatId('postCodeLookup', name)] && 'Please enter a valid postcode'}
        >
          <div className="l-flex">
            <div>
              <input
                id={formatId('postCodeLookup', name)}
                name={formatId('postCodeLookup', name)}
                className={`c-input ${errors[formatId('postCodeLookup', name)] && 'isInvalid'} ${
                  required && 'isRequired'
                }`}
                type="text"
                required={required}
                aria-invalid={!!errors.postCodeLookup}
                ref={register({
                  required: required,
                  validate: required ? () => addressDetails !== null : null,
                })}
                onChange={handlePostCodeEntry}
                disabled={disabled}
              />
            </div>
            <div>
              <Button type="button" variant="primary" onClick={handleFindAddress} disabled={disabled}>
                Find
              </Button>
            </div>
          </div>
        </FormField>
      )}
      {addressSelection && (
        <FormField label="Select address">
          <InputSelect
            id="select-address"
            options={addressSelection}
            required={false}
            forceSelection
            onChange={handleAddressSelection}
          />
        </FormField>
      )}

      {!addressDetails && (
        <Button type="button" variant="bare" childClasses="u-mb-2" onClick={handleManualAddressView}>
          {showManualAddress ? 'Use Postcode lookup' : 'Enter address manually'}
        </Button>
      )}

      {showManualAddress && (
        <>
          <FormField id={formatId('propertyName', name)} label="Property name">
            <Input
              id={formatId('propertyName', name)}
              placeHolder="Property Name"
              required={requiredToggle ? !(requiredToggle[formatId('propertyNumber', name)]?.length > 0) : true}
              error={!!errors[formatId('propertyName', name)] && !!errors[formatId('propertyName', name)]}
              ref={register({
                required: requiredToggle ? !(requiredToggle[formatId('propertyNumber', name)]?.length > 0) : true,
              })}
              setValue={setValue}
              value={propertyName}
              disabled={disabled}
            />
          </FormField>

          <FormField
            id={formatId('propertyNumber', name)}
            label="Property number"
            error={
              errors[formatId('propertyNumber', name)] &&
              errors[formatId('propertyName', name)] &&
              'Please enter a property name or number'
            }
          >
            <Input
              id={formatId('propertyNumber', name)}
              placeHolder="Property Number"
              required={requiredToggle ? !(requiredToggle[formatId('propertyName', name)]?.length > 0) : true}
              error={!!errors[formatId('propertyNumber', name)] && !!errors[formatId('propertyName', name)]}
              ref={register({
                required: requiredToggle ? !(requiredToggle[formatId('propertyName', name)]?.length > 0) : true,
              })}
              setValue={setValue}
              value={propertyNumber}
              disabled={disabled}
            />
          </FormField>

          <FormField
            id={formatId('road', name)}
            label="Road"
            error={errors[formatId('road', name)] && 'Please enter a valid road'}
          >
            <Input
              id={formatId('road', name)}
              placeHolder="Road"
              required={required}
              error={!!errors[formatId('road', name)]}
              ref={register({ required: required })}
              setValue={setValue}
              value={road}
              disabled={disabled}
            />
          </FormField>

          <FormField
            id={formatId('town', name)}
            label="Town"
            error={errors[formatId('town', name)] && 'Please enter a valid town'}
          >
            <Input
              id={formatId('town', name)}
              placeHolder="Town"
              required={required}
              error={!!errors[formatId('town', name)]}
              ref={register({ required: required })}
              setValue={setValue}
              value={town}
              disabled={disabled}
            />
          </FormField>

          <FormField
            id={formatId('county', name)}
            label="County"
            error={errors[formatId('county', name)] && 'Please enter a valid county'}
          >
            <Input
              id={formatId('county', name)}
              required={required}
              error={!!errors[formatId('county', name)]}
              placeHolder="County"
              ref={register({ required: required })}
              setValue={setValue}
              disabled={disabled}
              value={county}
            />
          </FormField>

          <FormField
            id={formatId('postCode', name)}
            label="Post Code"
            error={errors[formatId('postCode', name)] && 'Please enter a valid postcode'}
          >
            <Input
              id={formatId('postCode', name)}
              placeHolder="Post Code"
              required={required}
              ref={register({ required: required })}
              error={!!errors[formatId('postCode', name)]}
              setValue={setValue}
              value={postcode}
              disabled={disabled}
            />
          </FormField>
        </>
      )}
    </fieldset>
  );
};
