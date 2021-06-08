import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form/dist/index.ie11';

import {
  FormField,
  InputAddress,
  InputDob,
  Input,
  InputBool,
  InputCurrency,
  InputList,
  Button,
  Section,
} from '../../../shared';
import {
  QuestionSetInterface,
  QuestionInterface,
  QuestionListInterface,
  ApplicantInterface,
  AnswerInterface,
  AddressInterface,
} from '../../../../shared/models';
import { ApplicationFormStatus, services } from '../../../../shared';
import { PageInterface } from '../section-menu/page.model';
import { useHistory } from 'react-router-dom';
import './question-set.scss';
import { CaseInterface } from '../section-menu/case.model';
import { WorkflowStepInterface } from 'components/sections/workflow/workflow.model';
import { CaseNavigation } from '../../case-navigation/case-navigation';
import { FormType } from '../../../../shared/types/enums';

import { defaultErrorResponse, hasError, ServiceHandlingInterface } from '../../../../shared/types/service-handling';

interface QuestionSetDataInterface {
  questionSet: QuestionSetInterface;
  caseId: number;
  formId: number;
  pages: PageInterface[];
  steps: WorkflowStepInterface[];
  location?: {
    state?: {
      loanPurposeId: number;
      case?: CaseInterface;
      applicants?: ApplicantInterface[];
    };
  };
  inputBoolChangeHandler?: (e: ChangeEvent<HTMLInputElement>) => void;
  inputListChangeHandler?: (e: ChangeEvent<HTMLInputElement>) => void;
  addAnother?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  removeLast?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const submitAnswerInitial: ServiceHandlingInterface<AnswerInterface[]> = {
  data: [],
  loading: false,
  error: false,
};

export const submitApplicationInitial: ServiceHandlingInterface<CaseInterface> = {
  data: undefined,
  loading: false,
  error: false,
};

const questionType = (
  applicantId: string,
  applicationApplicantId: number,
  question: QuestionInterface,
  questionList: QuestionListInterface,
  questionSet: QuestionSetInterface,
  rowPosition: number,
  register?: ReturnType<typeof useForm>['register'],
  errors?: ReturnType<typeof useForm>['errors'],
  setValue?: ReturnType<typeof useForm>['setValue'],
  inputBoolChangeHandler?: (e: ChangeEvent<HTMLInputElement>) => void,
  inputListChangeHandler?: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
  watch?: ReturnType<typeof useWatch>['watch'],
) => {
  const { dataType, id, required, listTypeCode, placeHolder, isDisabled } = question;
  const inputId = `${applicantId}-${id}-${rowPosition}`;
  const answer = questionSet?.answers?.find(
    (answer) =>
      question.id === answer.formSectionQuestionId &&
      answer.rowPosition === rowPosition &&
      (!answer.isApplicantSpecificQuestion || answer.applicationApplicantId === applicationApplicantId),
  );

  switch (dataType) {
    case 'STRING':
      return (
        <Input
          id={inputId}
          error={!!errors[inputId]}
          ref={register({ required: required })}
          setValue={setValue}
          value={answer?.value}
          placeHolder={placeHolder}
          required={required}
          disabled={false}
        />
      );

    case 'TEXT':
      return (
        <Input
          id={inputId}
          error={!!errors[inputId]}
          ref={register({ required: required })}
          setValue={setValue}
          value={answer?.value}
          required={required}
          disabled={false}
        />
      );

    case 'CURRENCY':
      return (
        <InputCurrency
          id={inputId}
          error={!!errors[inputId]}
          ref={register({ required: required })}
          setValue={setValue}
          value={answer?.value}
          required={required}
          disabled={false}
        />
      );
    case 'NUMBER':
      return (
        <Input
          id={inputId}
          type="number"
          error={!!errors[inputId]}
          ref={register({ required: required })}
          setValue={setValue}
          value={answer?.value}
          required={required}
          disabled={false}
        />
      );
    case 'BOOL':
      return (
        <InputBool
          name={inputId}
          legend={inputId}
          ref={register({ required: required })}
          setValue={setValue}
          value={answer?.value}
          onChange={inputBoolChangeHandler}
        />
      );

    case 'BOOLEAN':
      return (
        <InputBool
          name={inputId}
          legend={inputId}
          ref={register({ required: required })}
          setValue={setValue}
          value={answer?.value}
          onChange={inputBoolChangeHandler}
        />
      );

    case 'DATE OF BIRTH':
      return (
        <InputDob
          register={register}
          required={required}
          setValue={setValue}
          value={answer?.value}
          name={inputId}
          errors={errors}
        />
      );

    case 'DATE': //maybe not accurate to use DOB input
      return (
        <InputDob
          register={register}
          required={required}
          setValue={setValue}
          value={answer?.value}
          name={inputId}
          errors={errors}
        />
      );

    case 'EMAIL':
      return (
        <Input
          type="email"
          id={inputId}
          required={required}
          ref={register({ required: required })}
          setValue={setValue}
          value={answer?.value}
          disabled={false}
        />
      );
    case 'ADDRESS':
      return (
        <InputAddress
          name={inputId}
          register={register}
          errors={errors}
          required={required}
          setValue={setValue}
          value={answer?.value}
          watch={watch}
        />
      );
    case 'LIST':
      return (
        <InputList
          id={inputId}
          legend="test"
          options={questionList[listTypeCode]}
          setValue={setValue}
          required={required}
          value={answer?.value}
          ref={register({ required: required })}
          inputListChangeHandler={inputListChangeHandler}
          disabled={isDisabled}
        />
      );
  }
};

export const QuestionSet: FunctionComponent<QuestionSetDataInterface> = ({
  questionSet,
  caseId,
  formId,
  pages,
  steps,
  location,
  inputBoolChangeHandler,
  inputListChangeHandler,
  addAnother,
  removeLast,
}) => {
  const { handleSubmit, register, setValue, errors, watch } = useForm();
  const [nextPage, setNextPage] = useState<any>();
  const [shSubmitAnswer, setShSubmitAnswer] = useState<ServiceHandlingInterface<AnswerInterface[]>>(
    submitAnswerInitial,
  );
  const [shApplicationSubmit, setShApplicationSubmit] = useState<ServiceHandlingInterface<CaseInterface>>(
    submitApplicationInitial,
  );
  const history = useHistory();

  if (!questionSet) {
    return <p>loading....</p>;
  }

  const mainApplicant = location.state.applicants.find((applicant: ApplicantInterface) => applicant.isMainApplicant);
  const otherApplicants = location.state.applicants.filter(
    (applicant: ApplicantInterface) => !applicant.isMainApplicant,
  );
  const otherApplicantQuestions = questionSet.questions.filter(
    (question: QuestionInterface) => question.applicantSpecific,
  );

  const formatAnswerResult = (
    question: QuestionInterface,
    answer: string,
    keys: string[],
    ans?: AnswerInterface,
  ): AnswerInterface => {
    const applicant =
      location.state.applicants.find((applicant) => applicant.id.toString() === keys[0]) ?? mainApplicant;
    return {
      applicationApplicantId: applicant.applicationApplicantId,
      formSectionQuestionId: question.id,
      rowPosition: keys.length > 2 ? Number(keys[2]) : 1,
      value: answer,
      applicationFormId: formId,
      applicationId: caseId,
      isMainApplicant: mainApplicant.id === applicant.id,
      isRequiredQuestion: question.required ?? false,
      isApplicantSpecificQuestion: question.applicantSpecific,
      isQuestionAnswered: true,
      isQuestionForThisApplicant: true,
      isComplete: true,
      applicationFormStatus: ApplicationFormStatus.Complete,
      autoDecline: ans ? ans.autoDecline : false,
      autoRefer: ans ? ans.autoRefer : false,
    };
  };

  const formatPartialAnswers = (question: QuestionInterface, data: any, subKeyList: string[], key: string) => {
    if (question.dataType === 'DATE OF BIRTH' || question.dataType === 'DATE') {
      if (data[`${key}-dy`] === '' && data[`${key}-dm`] === '' && data[`${key}-dd`] === '') return;
      return new Date(
        Date.UTC(parseInt(data[`${key}-dy`]), parseInt(data[`${key}-dm`]) - 1, parseInt(data[`${key}-dd`])), // Note : Month start with 0 not 1, Hence -1
      ).toISOString();
    } else if (question.dataType === 'ADDRESS') {
      const propList: Record<string, string> = {};
      subKeyList.forEach((subKey) => {
        const subKeys: string[] = subKey.split('-');
        propList[subKeys[subKeys.length - 1]] = subKey;
      });

      const address: AddressInterface = {
        propertyName: data[propList['propertyName']],
        propertyNumber: data[propList['propertyNumber']],
        road: data[propList['road']],
        town: data[propList['town']],
        county: data[propList['county']],
        postCode: data[propList['postCode']],
      };
      if (data[propList['postCode']] != null) {
        services.saveAddress(address).then((result) => {
          services.saveSectionAnswers(caseId, formId, [
            formatAnswerResult(question, result.data?.id?.toString(), key.split(`-`)),
          ]);
        });
      }
    }
  };

  const formatAnswerKeys = (answers: string[]) => {
    const answerKeys: any[] = [];
    const partialAnswerKeys: Record<string, string[]> = {};
    Object.keys(answers).forEach((key) => {
      const keys = key.split('-');
      if (keys.length < 4) {
        answerKeys.push({ id: key, keys: keys });
      } else {
        const answerId = `${keys[0]}-${keys[1]}-${keys[2]}`;
        const partialAnswers = partialAnswerKeys[answerId] || [];
        partialAnswers.push(key);
        partialAnswerKeys[answerId] = partialAnswers;
      }
    });
    return { partial: partialAnswerKeys, answers: answerKeys };
  };

  const onSubmit = async (data: any) => {
    const answerKeys = formatAnswerKeys(data);
    const questionAnswers: AnswerInterface[] = answerKeys.answers.map((answer) => {
      const question = questionSet.questions.find((question) => question.id.toString() === answer.keys[1]);
      const ans = questionSet.answers?.find(
        (a) =>
          a.formSectionQuestionId === question.id &&
          a.applicationApplicantId === answer.keys[0] &&
          a.rowPosition === answer.keys[2],
      );
      return formatAnswerResult(question, data[answer.id], answer.keys, ans);
    });
    Object.keys(answerKeys.partial).forEach((answer) => {
      const keys = answer.split('-');
      const question = questionSet.questions.find((question) => question.id.toString() === keys[1]);
      const value = formatPartialAnswers(question, data, answerKeys.partial[answer], answer);
      if (value) questionAnswers.push(formatAnswerResult(question, value, keys));
    });

    setShSubmitAnswer({ ...shSubmitAnswer, loading: true });
    services
      .saveSectionAnswers(
        caseId,
        formId,
        questionAnswers.filter((answer) => answer && answer.value && answer.value.length > 0),
      )
      .then((result) => {
        setShSubmitAnswer(result);
        if (result && result.data && !result.error) saveSectionEvent();
      });
  };

  const saveSectionEvent = () => {
    if (steps?.find((step) => step.isActive)?.formType === FormType.Application.toString()) {
      setShApplicationSubmit({ ...shApplicationSubmit, loading: true });
      services.submitApplication(caseId, formId).then((result) => {
        setShApplicationSubmit(result);
        history.push(nextPage.path, location.state);
      });
    } else {
      history.push(nextPage.path, location.state);
    }
  };

  const display = (question: QuestionInterface) => {
    return question.parentId === null ||
      (question.parentId !== null &&
        questionSet.answers?.filter((a) => a.formSectionQuestionId === question.parentId)?.length > 0)
      ? question.parentId === null ||
          (question.parentId !== null &&
            question.parentDataType !== 'LIST' &&
            question.parentAnswerValue ===
              questionSet.answers?.filter((a) => a.formSectionQuestionId === question.parentId)[0]?.value) ||
          (question.parentDataType === 'LIST' &&
            questionSet.answers?.filter((a) => a.formSectionQuestionId === question.parentId)[0].value?.trim() ===
              question.parentAnswerListsId?.toString())
      : false;
  };

  const displayAutoDeclineWarning = (
    questionSet: QuestionSetInterface,
    question: QuestionInterface,
    applicationApplicantId: number,
  ) => {
    const isAutoDeclined =
      questionSet?.answers?.find(
        (answer) =>
          question.id === answer.formSectionQuestionId && answer.applicationApplicantId === applicationApplicantId,
      ) &&
      questionSet?.answers?.find(
        (answer) =>
          question.id === answer.formSectionQuestionId && answer.applicationApplicantId === applicationApplicantId,
      ).autoDecline;

    const isAutoReferred =
      questionSet?.answers?.find(
        (answer) =>
          question.id === answer.formSectionQuestionId && answer.applicationApplicantId === applicationApplicantId,
      ) &&
      questionSet?.answers?.find(
        (answer) =>
          question.id === answer.formSectionQuestionId && answer.applicationApplicantId === applicationApplicantId,
      ).autoRefer;

    if (isAutoReferred || isAutoDeclined)
      return (
        <span className="c-question-set__auto-decline">
          This answer does not meet the required criteria and the application will be
          {isAutoDeclined ? ' declined' : isAutoReferred ? ' referred' : ''}
        </span>
      );
  };

  const displayButtonForMultiple = (
    question: QuestionInterface,
    text: string,
    clickHandler: (e: React.MouseEvent<HTMLButtonElement>) => void,
    condition: boolean,
    applicationApplicantId: number,
  ) => {
    return (
      condition && (
        <Button
          type="button"
          variant="secondary"
          childClasses="u-mt-2 u-mr-10"
          onClick={clickHandler}
          dataValue={applicationApplicantId + '|' + question.id}
        >
          {text}
        </Button>
      )
    );
  };

  if (hasError([shSubmitAnswer, shApplicationSubmit])) {
    return defaultErrorResponse();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="c-question-set" noValidate>
      <fieldset>
        <legend>{questionSet.name}</legend>
        <Section
          title={`${mainApplicant.firstName} ${mainApplicant.surname} (Main Applicant)`}
          mb={otherApplicantQuestions.length > 0 && 6}
        >
          {questionSet.questions.map((question: QuestionInterface) => (
            <FormField
              key={`${mainApplicant.id}-${question.id}`}
              id={`${mainApplicant.id}-${question.id}`}
              label={question.name}
              error={
                question.dataType === 'DATE OF BIRTH'
                  ? errors[
                      `${mainApplicant.id}-${question.id}Day` ||
                        `${mainApplicant.id}-${question.id}Month` ||
                        `${mainApplicant.id}-${question.id}Year`
                    ] && 'This field is required'
                  : errors[`${mainApplicant.id}-${question.id}`] && 'This field is required'
              }
              display={display(question)}
            >
              {(!question.allowMultiple ||
                questionSet.answers?.length === 0 ||
                questionSet.answers?.filter(
                  (a) =>
                    a.formSectionQuestionId === question.id &&
                    a.applicationApplicantId === Number(mainApplicant.applicationApplicantId),
                ).length == 0) && (
                <>
                  {questionType(
                    mainApplicant.id,
                    mainApplicant.applicationApplicantId,
                    question,
                    questionSet.lists,
                    questionSet,
                    1,
                    register,
                    errors,
                    setValue,
                    inputBoolChangeHandler,
                    inputListChangeHandler,
                  )}
                </>
              )}
              {question.allowMultiple &&
                questionSet.answers?.length > 0 &&
                questionSet.answers
                  ?.filter(
                    (a) =>
                      a.formSectionQuestionId === question.id &&
                      a.applicationApplicantId === Number(mainApplicant.applicationApplicantId),
                  )
                  .map((answer) => (
                    <div key={answer.id + '-' + mainApplicant.id + '-' + answer.rowPosition} className="u-mb-2">
                      {questionType(
                        mainApplicant.id,
                        mainApplicant.applicationApplicantId,
                        question,
                        questionSet.lists,
                        questionSet,
                        answer.rowPosition,
                        register,
                        errors,
                        setValue,
                        inputBoolChangeHandler,
                        inputListChangeHandler,
                      )}
                    </div>
                  ))}
              {displayAutoDeclineWarning(questionSet, question, Number(mainApplicant.id))}
              {displayButtonForMultiple(
                question,
                'Add another',
                addAnother,
                question.allowMultiple ?? false,
                mainApplicant.applicationApplicantId,
              )}
              {displayButtonForMultiple(
                question,
                'Remove last',
                removeLast,
                (question.allowMultiple ?? false) &&
                  questionSet.answers?.filter(
                    (ans) =>
                      ans.formSectionQuestionId === question.id &&
                      ans.applicationApplicantId === mainApplicant.applicationApplicantId,
                  ).length > 1,
                mainApplicant.applicationApplicantId,
              )}
            </FormField>
          ))}
        </Section>

        {otherApplicantQuestions.length > 0 &&
          otherApplicants.map((applicant: ApplicantInterface, index: number) => (
            <Section
              key={applicant.id}
              title={`${applicant.firstName} ${applicant.surname} (Applicant ${(index + 2).toString()})`}
              mb={otherApplicantQuestions.length > 0 && 6}
            >
              {otherApplicantQuestions.map((question: QuestionInterface) => (
                <FormField
                  key={`${applicant.id}-${question.id}`}
                  id={`${applicant.id}-${question.id}`}
                  label={question.name}
                  display={display(question)}
                  error={
                    question.dataType === 'DATE OF BIRTH'
                      ? errors[
                          `${applicant.id}-${question.id}Day` ||
                            `${applicant.id}-${question.id}Month` ||
                            `${applicant.id}-${question.id}Year`
                        ] && 'This field is required'
                      : errors[`${applicant.id}-${question.id}`] && 'This field is required'
                  }
                >
                  {(!question.allowMultiple ||
                    questionSet.answers?.length === 0 ||
                    questionSet.answers?.filter(
                      (a) =>
                        a.formSectionQuestionId === question.id &&
                        a.applicationApplicantId === Number(applicant.applicationApplicantId),
                    ).length == 0) && (
                    <>
                      {questionType(
                        applicant.id,
                        applicant.applicationApplicantId,
                        question,
                        questionSet.lists,
                        questionSet,
                        1,
                        register,
                        errors,
                        setValue,
                        inputBoolChangeHandler,
                        inputListChangeHandler,
                        watch,
                      )}
                    </>
                  )}
                  {question.allowMultiple &&
                    questionSet.answers?.length > 0 &&
                    questionSet.answers
                      ?.filter(
                        (a) =>
                          a.formSectionQuestionId === question.id &&
                          a.applicationApplicantId === Number(applicant.applicationApplicantId),
                      )
                      .map((answer) => (
                        <div key={answer.id + '-' + applicant.id + '-' + answer.rowPosition} className="u-mb-2">
                          {questionType(
                            applicant.id,
                            applicant.applicationApplicantId,
                            question,
                            questionSet.lists,
                            questionSet,
                            answer.rowPosition,
                            register,
                            errors,
                            setValue,
                            inputBoolChangeHandler,
                            inputListChangeHandler,
                            watch,
                          )}
                        </div>
                      ))}
                  {displayAutoDeclineWarning(questionSet, question, Number(applicant.id))}
                  {displayButtonForMultiple(
                    question,
                    'Add another',
                    addAnother,
                    question.allowMultiple ?? false,
                    applicant.applicationApplicantId,
                  )}
                  {displayButtonForMultiple(
                    question,
                    'Remove last',
                    removeLast,
                    (question.allowMultiple ?? false) &&
                      questionSet.answers?.filter(
                        (ans) =>
                          ans.formSectionQuestionId === question.id &&
                          ans.applicationApplicantId === applicant.applicationApplicantId,
                      ).length > 1,
                    applicant.applicationApplicantId,
                  )}
                </FormField>
              ))}
            </Section>
          ))}
      </fieldset>
      <CaseNavigation
        pages={pages}
        workflowSteps={steps}
        location={location}
        setTargetPage={setNextPage}
        useFormSubmit={true}
      />
    </form>
  );
};
