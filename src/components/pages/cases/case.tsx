import React, { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  CaseInterface,
  CustomerDetailInterface,
  QuestionInterface,
  NoteInterface,
  StageInterface,
} from '../../../shared/models';

import { services, getIntials } from '../../../shared';
import { AccordionItem, Button, Container, PageHeading, Pill } from '../../shared';
import { CaseDetails } from '../../sections/case-details/case-details';
import { formatAddress } from '../../../shared/utils';
import { ClientApplicants } from '../../sections/client-applicants/client-applicants';
import { CaseTracking } from '../../sections';
import { Notes } from '../../sections/notes/notes';
import { ApplicationStatus } from '../../../shared/types/enums';
import { Dialog } from '../../shared/dialog/dialog';

import { useHistory } from 'react-router-dom';

import { WorkflowStepInterface } from 'components/sections/workflow/workflow.model';

interface UrlParamInterface {
  caseId?: string;
}

export const CasePage: FunctionComponent = (): ReactElement => {
  const { caseId } = useParams<UrlParamInterface>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [caseDetails, setCaseDetails] = useState<CaseInterface>();
  const [customerDetails, setCustomerDetails] = useState<CustomerDetailInterface>();
  const [applicationQuestions, setApplicationQuestions] = useState<QuestionInterface[]>();
  const [notes, setNotes] = useState<NoteInterface[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>();
  const [cancelMessage, setCancelMessage] = useState<string>();
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStepInterface[]>();
  const [caseStages, setCaseStages] = useState<StageInterface[]>();

  const fetchNotes = async () => {
    const noteData = (await services.getNotes(Number(caseId))).data;
    setNotes(noteData);
  };

  const history = useHistory();

  const getWorkflowDetails = async () => {
    const workflow = (await services.getDynamicWorkflow(Number(caseId), 341)).data; //awaiting changes in develop to make loanpurpose dynamic
    setWorkflowSteps(workflow.workflowSteps);
  };

  const fetchData = async () => {
    const activeCase = Number(caseId);
    const caseDetailsData = (await services.getCase(activeCase)).data;
    const customerDetailsData = (await services.getCustomer(caseDetailsData.customerId)).data;

    const fees = (await services.getPaidFees(caseDetailsData.id)).data;
    setCancelMessage(
      (fees?.filter((fee) => fee.isPaid).length > 0 ? 'Fees have been paid for this case. ' : '') +
        'Are you sure you want to cancel this case?',
    );
    const caseDetails = (await services.getCaseDetails(activeCase)).data;
    const caseStages = (await services.getCaseTracking(activeCase)).data;

    setCaseStages(caseStages);
    setApplicationQuestions(caseDetails);
    setCaseDetails(caseDetailsData);
    setCustomerDetails(customerDetailsData);
    fetchNotes();
    getWorkflowDetails();
    setIsLoading(false);
  };

  const cancelCase: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> = async (e) => {
    await services.cancelCase(caseDetails.id);
    await fetchData();
    hideModal();
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const continueCase: (e: React.MouseEvent<HTMLButtonElement>) => void = (e) => {
    history.push(`/cases/application/${e.currentTarget.getAttribute('data-value')}`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <section className="case-wrapper">
        <Dialog message={cancelMessage} show={modalVisible} handleClose={hideModal} submit={cancelCase} />
        <PageHeading
          headingLevel={2}
          title={`Case ${caseId}`}
          initials={getIntials(customerDetails.firstName, customerDetails.surname)}
          subText={`${customerDetails.firstName} ${customerDetails.surname} - ${formatAddress(
            customerDetails.address,
          )}`}
          progress={<Pill status={caseDetails.applicationStatusId} />}
          mb={6}
        />
        <Container fullWidth>
          <div className="l-grid grid-wrapper">
            <div className="l-grid_span-12 l-grid_span-3@bp20 grid-border_blue">
              <AccordionItem heading="Applicants" count={caseDetails?.applicants?.length}>
                <ClientApplicants caseDetails={caseDetails} />
              </AccordionItem>
            </div>
            <div className="l-grid_span-12 l-grid_span-6@bp20 grid-border_orange">
              <AccordionItem heading="Case Tracking" mb={4} extendClass="c-case-tracking">
                <div className="l-grid c-case-tracking-desktop">
                  <div className="l-grid_span-4 u-mb-6">
                    <Button
                      variant="outline"
                      width="full"
                      type="button"
                      onClick={showModal}
                      childClasses="c-case-cancel"
                      disabled={caseDetails.applicationStatusId === ApplicationStatus.Closed}
                    >
                      <b>Cancel Case</b>
                    </Button>
                  </div>
                  <div className="l-grid_span-8 u-mb-6">
                    <Button
                      variant="primary"
                      width="full"
                      type="button"
                      onClick={continueCase}
                      disabled={!(caseDetails.applicationStatusId === ApplicationStatus.Active)}
                      dataValue={caseDetails.id}
                    >
                      <b>Continue Mortgage Case</b>
                    </Button>
                  </div>
                </div>
                <CaseTracking workflowSteps={workflowSteps} caseStages={caseStages} caseId={Number(caseId)} />
              </AccordionItem>
              <AccordionItem heading="Loan Details" extendClass="c-case-details">
                <CaseDetails applicationQuestions={applicationQuestions} address={customerDetails.address} />
              </AccordionItem>
            </div>
            <div className="l-grid_span-12 l-grid_span-3@bp20 grid-border_green">
              <AccordionItem heading="Notes" count={notes?.length}>
                <Notes notes={notes} caseId={Number(caseId)} customerId={customerDetails.id} fetchData={fetchNotes} />
              </AccordionItem>
            </div>
          </div>
        </Container>
      </section>
      <div className="l-grid c-case-tracking-controls c-case-tracking-mobile">
        <div className="l-grid_span-6">
          <Button
            variant="outline"
            width="full"
            type="button"
            onClick={showModal}
            childClasses="c-case-cancel"
            disabled={caseDetails.applicationStatusId === ApplicationStatus.Closed}
          >
            <b>Cancel</b>
          </Button>
        </div>
        <div className="l-grid_span-6">
          <Button
            variant="primary"
            width="full"
            type="button"
            onClick={continueCase}
            disabled={!(caseDetails.applicationStatusId === ApplicationStatus.Active)}
            dataValue={caseDetails.id}
          >
            <b>Continue</b>
          </Button>
        </div>
      </div>
    </>
  );
};
