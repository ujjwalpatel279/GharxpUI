export enum ApplicationFormStatus {
  Complete = 1,
  Partial = 2,
  MissingRequired = 3,
  NoData = 4,
  NotApplicable = 5,
}

export enum FormType {
  Application = 1,
  DIP = 2,
  Illustration = 3,
  Enquiry = 4,
}

export enum ApplicationStatus {
  NoStatus = 0,
  Active = 1,
  Completed = 2,
  Closed = 3,
  Pending = 4,
  Declined = 5,
  Submitted = 6,
  Referred = 7,
  Returned = 8,
  Sent = 9,
  Pass = 10,
  Ready = 11,
  Transferred = 12,
  Completion = 13,
  AutoDeclined = 14,
  ReferredWaitingForMoreInfo = 15,
  DeclinedWaitingForMoreInfo = 16,
  AutoDeclinedWaitingForMoreInfo = 17,
  ReferredWithMoreInfoSubmited = 18,
  DeclinedWithMoreInfoSubmited = 19,
  AutoDeclinedWithMoreInfoSubmited = 20,
  AutoRefer = 21,
  AutoDeclineCancelled = 22, //AutoDecisionDeclinedCancellation
  CallValidateCallCreditRefer = 23,
  CallValidateCallCreditFail = 24,
}
