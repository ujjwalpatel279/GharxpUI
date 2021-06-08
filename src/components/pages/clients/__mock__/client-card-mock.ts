export const casesObject = [
  {
    id: '123432',
    status: 1,
  },
  {
    id: '123434',
    status: 2,
  },
  {
    id: '321123',
    status: 3,
  },
  {
    id: '12399',
    status: 2,
  },
  {
    id: '398813',
    status: 2,
  },
];

export const documentsObject = [
  {
    canBeDeleted: false,
    compressed: false,
    customerId: 0,
    description: '',
    docCode: '',
    documentBinaryString: '',
    formId: 0,
    id: 0,
    mimeType: '',
    typeCategory: '',
    typeId: 0,
    uploadedOn: '',
  },
];
export const clientData = {
  client: {
    id: 0,
    firstName: '',
    surname: '',
    titleId: 0,
    dateOfBirth: '',
    email: '',
    mobileNumber: '',
    address: {
      id: 0,
      propertyName: '',
      propertyNumber: '',
      road: '',
      town: '',
      county: '',
      postCode: '',
    },
    correspondenceAddress: {
      id: 0,
      propertyName: '',
      propertyNumber: '',
      road: '',
      town: '',
      county: '',
      postCode: '',
    },
  },
  cases: casesObject,
  documentsObject: documentsObject,
};
