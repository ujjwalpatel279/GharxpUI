import React, { FunctionComponent, ReactElement } from 'react'
import { useForm } from 'react-hook-form/dist/index.ie11';
import { services, validation } from '../../../shared';

import { UserInterface, TitleInterface } from '../../../shared/models'
import { Button, FormField, InputList, Input, InputDob, InputAddress } from '../../shared';
import './add-user.scss';

interface AddUserProps {
  title: TitleInterface[];
  handleCancel: (arg0: boolean) => void;
  fetchUser?: (searchTerm: string) => void;

}

type Inputs = {
  name: string;
  contactno: string;
  AreaName: string;
  EmailId: string;
  Pincode: string;
  City: string;
  State: string;
};
export const AddUser: FunctionComponent<AddUserProps> = ({
  title,
  handleCancel,
  fetchUser,
}): ReactElement => {
  const { register, handleSubmit, setValue, errors, watch } = useForm<Inputs>();
  const onSubmit = async (data: Inputs) => {
    console.log(data.name);
    const user: UserInterface = {
      name: data.name,
      contactNo: data.contactno,
      areaName: data.AreaName,
      pincode: data.Pincode,
      emailId: data.EmailId,
      city: data.City,
      state: data.State,
      //pageCount : 
    };
    console.log(user);
    const res = await services.saveUser(user);
    console.log(res);
    if (res !== null) {
      handleCancel(false);
      fetchUser('');
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="c-add-client">
      <FormField id="name" label="User name" >
        <Input id="name" ref={register} />
      </FormField>

      <FormField id="contactno" label="contactno" >
        <Input id="contactno" ref={register} />
      </FormField>

      <FormField id="AreaName" label="AreaName" >
        <Input id="AreaName" ref={register} />
      </FormField>

      <FormField id="Pincode" label="Pincode" >
        <Input id="Pincode" ref={register} />
      </FormField>

      <FormField id="EmailId" label="EmailId" >
        <Input id="EmailId" ref={register} />
      </FormField>

      <FormField id="City" label="City" >
        <Input id="City" ref={register} />
      </FormField>

      <FormField id="State" label="State" >
        <Input id="State" ref={register} />
      </FormField>

      <Button type="submit" variant="primary" childClasses="u-mr-2">
        Add new User
        </Button>
      <Button type="button" variant="bare" size="small" onClick={() => handleCancel(false)}>
        Cancel
        </Button>
    </form>

  );

};