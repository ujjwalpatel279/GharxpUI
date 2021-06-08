import React, { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';

import { Button, FormField, Input, InputList } from '../../shared';
import { services } from '../../../shared';

import './upload-document.scss';

import { ListItemInterface } from '../../../shared/models';
import { useForm } from 'react-hook-form';

export interface UploadDocumentInterface {
  handleClose: () => void;
  show: boolean;
  customerId: number;
  reloadDocumentGrid?: (id: number) => void | Promise<void>;
}

type Inputs = {
  documentCategoryId: string;
  fileDescription: string;
  customerDocument: File;
};

export const UploadDocument: FunctionComponent<UploadDocumentInterface> = ({
  handleClose,
  show,
  customerId,
  reloadDocumentGrid,
}) => {
  const { register, handleSubmit, reset, errors } = useForm<Inputs>();
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  const [documentCategories, setDocumentCategories] = useState<ListItemInterface[]>();
  const [selectedCategory, setSelectedCategory] = useState<ListItemInterface>(null);
  const [fileToUpload, setFileToUpload] = useState<string>(null);
  const [description, setDescription] = useState<string>(null);
  const validation = {
    fileDescription: {
      types: { required: true },
      message: `Please select a file description`,
    },
    documentCategoryId: {
      types: { required: true },
      message: `Please select a document category`,
    },
    customerDocument: {
      types: { required: true },
      message: `Please select a file to upload`,
    },
  };

  const changeCategory: (e: ChangeEvent<HTMLSelectElement>) => void = (e) => {
    const selectedCategory = e.currentTarget.selectedOptions[0];
    setSelectedCategory({
      id: Number(selectedCategory.id),
      value: selectedCategory.value,
      code: selectedCategory.value,
      selectable: true,
    });
  };

  const handleUpload: () => Promise<void> = async () => {
    const id = customerId;

    await services.uploadDocument({
      id: 0,
      customerId: customerId,
      typeId: Number(selectedCategory?.value),
      documentBinaryString: fileToUpload,
      description: (description ?? '').trim() !== '' ? description : selectedCategory?.code,
    });
    reloadDocumentGrid(id);
    handleClose();
  };

  const formatValue = (value: string): string => {
    const formattedValues = value.split(' ').map((s) => {
      const ss = s.toLowerCase().split('');
      ss[0] = ss[0].toUpperCase();
      return ss.join('');
    });
    return formattedValues.join(' ');
  };

  const getDocumentCategories = async () => {
    const individual: ListItemInterface[] =
      (await services.getList('CustomerIdPrivateIndividual')).data?.map((c) => ({
        id: c.id,
        code: c.code,
        displayText: formatValue(c.value),
        value: c.id.toString(),
        selectable: true,
      })) ?? [];
    const address: ListItemInterface[] =
      (await services.getList('AddressIdPrivateIndividual')).data?.map((c) => ({
        id: c.id,
        code: c.code,
        displayText: formatValue(c.value),
        value: c.id.toString(),
        selectable: true,
      })) ?? [];
    const general: ListItemInterface[] =
      (await services.getList('DocumentType')).data?.map((c) => ({
        id: c.id,
        code: c.code,
        displayText: formatValue(c.value),
        value: c.id.toString(),
        selectable: true,
      })) ?? [];

    let categories: ListItemInterface[] = [];

    if (individual.length > 0) {
      individual.splice(0, 0, { id: -999, code: 'Individual', value: ' -- Individual -- ', selectable: false });
      categories = [...categories, ...individual];
    }
    if (address.length > 0) {
      address.splice(0, 0, { id: -998, code: 'Address', value: ' -- Address -- ', selectable: false });
      categories = [...categories, ...address];
    }

    if (general.length > 0) {
      general.splice(0, 0, { id: -997, code: 'General', value: ' -- General -- ', selectable: false });
      categories = [...categories, ...general];
    }
    setDocumentCategories(categories);
  };
  let fileReader: FileReader;
  const handleFileRead = () => {
    setFileToUpload(fileReader.result.toString());
  };

  const handleChange = (files: FileList) => {
    setFileToUpload(null);
    if (files?.length) {
      const file = files[0];
      if (file.size <= 4194304 && ['application/pdf', 'image/jpeg', 'image/png'].indexOf(file.type) > -1) {
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsDataURL(file);
      }
    }
  };

  const onSubmit = async () => {
    handleUpload();
  };

  useEffect(() => {
    setDescription(null);
    setSelectedCategory(null);
    reset({ documentCategoryId: null, fileDescription: null, customerDocument: null });
    if (!documentCategories) getDocumentCategories();
  }, [show]);

  return (
    <div className={showHideClassName + ' doc-upload'}>
      <section className="modal-main">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField label="File to upload" error={errors.customerDocument && validation.customerDocument.message}>
            <input
              type="file"
              id="customerDocument"
              name="customerDocument"
              aria-invalid={fileToUpload?.length === 0 ? 'true' : 'false'}
              onChange={(e) => handleChange(e.target.files)}
              accept="image/png, image/jpeg, application/pdf"
            />
            <p role="alert" className={!fileToUpload ? 'c-form-field__error' : 'c-form-field__hidden'}>
              Please select a file of type jpg/png/pdf with a file size less than 4MB
            </p>
          </FormField>
          <FormField label="Category" error={errors.documentCategoryId && validation.documentCategoryId.message}>
            <InputList
              id="documentCategoryId"
              options={documentCategories}
              legend="Select a document category"
              forceSelection
              required={true}
              error={!!errors.documentCategoryId}
              ref={register(validation.documentCategoryId.types)}
              inputListChangeHandler={changeCategory}
            />
          </FormField>
          <FormField label="File Description" error={errors.fileDescription && validation.fileDescription.message}>
            <Input
              id="fileDescription"
              placeHolder="File Description"
              onChange={(event) => setDescription(event.target.value)}
              error={!!errors.fileDescription}
              ref={register(validation.fileDescription.types)}
            />
          </FormField>
          <p className="u-mb-1"></p>
          <Button type="button" variant="secondary" size="small" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            childClasses="upload-button"
            variant="primary"
            size="small"
            dataValue={customerId}
            disabled={selectedCategory == null || fileToUpload === null || description === null || description === ''}
          >
            Upload
          </Button>
        </form>
      </section>
    </div>
  );
};
