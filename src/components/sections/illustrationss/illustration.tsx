import React, { FunctionComponent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Icon, PageHeading, Section } from '../../shared';
import { IllustrationTable } from './illustration-table/illustration-table';
import { CaseInterface, PageInterface } from '../../../components/sections/question-sets/section-menu';
import { WorkflowStepInterface } from '../../../components/sections/workflow/workflow.model';
import { ApplicantInterface } from '../../../components/sections/applicants/applicant.model';
import { services } from '../../../shared';
import { CaseNavigation, NavPageInterface } from '../case-navigation/case-navigation';
import { EsisSummaryInterface } from 'shared/models';
import { APPLICATION } from '../../../config/routes';
import './illustration.scss';

interface illustrationInterface {
  pages: PageInterface[];
  steps: WorkflowStepInterface[];
  rootPath: string;
  location?: {
    state?: {
      loanPurposeId: number;
      case?: CaseInterface;
      applicants?: ApplicantInterface[];
    };
  };
  workflowName: string;
  caseId: number;
  loanPurposeId: number;
  formId: number;
}

export const Illustrations: FunctionComponent<illustrationInterface> = ({
  caseId,
  loanPurposeId,
  location,
  pages,
  steps,
  formId,
}) => {
  const [caseDetails, setCaseDetails] = useState<CaseInterface>();
  const [formPage, setFormPage] = useState<any>();
  const [esisSummary, setEsisSummary] = useState<EsisSummaryInterface[]>();
  const [pageStep, setPageStep] = useState<NavPageInterface>();

  const fetchCaseDetails = async (caseId: number, loanPurposeId: number) => {
    const c: CaseInterface = location?.state?.case ?? (await services.getCase(caseId)).data;
    location.state = {
      applicants: c.applicants,
      case: c,
      loanPurposeId: loanPurposeId,
    };

    setCaseDetails(c);
  };

  const fetchEsisSummary = async (caseId: number, formId: number) => {
    const esisDetails = await services.getEsisSummary(caseId, formId);
    if (esisDetails?.data && esisDetails.data.length > 0) setEsisSummary(esisDetails.data);
  };

  useEffect(() => {
    if (steps && formId) {
      const currentStep = steps.findIndex((step) => step.formId == formId);
      if (currentStep < steps.length - 1) {
        services.getPages(steps[currentStep + 1]?.formId ?? Number(formId)).then((result) => {
          if (result) {
            const row = result.data[0];
            setPageStep({
              sectionId: row.sections[0]?.id,
              pageId: row.id,
              path: `${APPLICATION.paths[0]}/${caseId}/${loanPurposeId}/${formId}/${row.id}/${row.sections[0].id}`,
              name: row.name,
            });
          }
        });
      } else {
        setPageStep({
          sectionId: 0,
          pageId: 0,
          path: `${APPLICATION.paths[0]}/${caseId}/${loanPurposeId}/${formId}/Complete`,
          name: 'Complete Full Mortgage Application',
        });
      }
    }
  }, [formId, steps, loanPurposeId, caseId]);

  useEffect(() => {
    if (caseId > 0) {
      fetchCaseDetails(caseId, loanPurposeId);
      if (formId > 0) {
        fetchEsisSummary(caseId, formId);
      }
    }
  }, [caseId, loanPurposeId, formId]);

  return (
    <>
      <PageHeading headingLevel={2} title="Illustration" icon="illustration" mb={6} />
      <Container fullWidth>
        <Section
          title="Your illustration documents"
          mb={6}
          headerChildren={
            <div>
              <Link to={formPage?.path ?? '/'} className="c-btn c-btn--primary">
                {esisSummary && esisSummary.length > 0
                  ? 'Update your illustration document'
                  : 'Create an illustration document'}
              </Link>
            </div>
          }
        >
          <IllustrationTable esisSummary={esisSummary} editPage={formPage?.path} />
          {esisSummary && (
            <div className="c-illustration-footer">
              <div className="c-illustration-footer-icon">
                <Icon name="info" size="large" colour="primary"></Icon>
              </div>
              <p className="c-illustration-footer-text">
                You can update your illustration with new details but make sure you download it first. Once you generate
                an updated illustration your previous one will be overwritten.
              </p>
            </div>
          )}
        </Section>
        <CaseNavigation
          pages={pages}
          workflowSteps={steps}
          location={location}
          setTargetPage={setFormPage}
          nextPageStep={pageStep}
        />
      </Container>
    </>
  );
};
