import { Icon } from '../../../shared';
import { CaseInterface } from './case.model';
import { PageInterface } from './page.model';
import React, { FunctionComponent, MouseEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './section-menu.scss';
import { ApplicationFormStatus } from '../../../../shared';
import { ApplicantInterface } from 'shared/models';

interface sectionMenuInterface {
  pages: PageInterface[];
  rootPath: string;
  workflowName: string;
  location?: {
    state?: {
      loanPurposeId: number;
      case?: CaseInterface;
      applicants?: ApplicantInterface[];
    };
  };
  closeMenu: (menuVisible: boolean) => void;
}

export const SectionMenu: FunctionComponent<sectionMenuInterface> = ({
  pages,
  rootPath,
  workflowName,
  location,
  closeMenu,
}) => {
  const [openPages, setOpenPages] = useState([]);
  useEffect(() => {
    setOpenPages([pages[0]?.id ?? 0]);
  }, [pages]);

  const setParentClasses = (page: PageInterface) => {
    let className = 'c-section-menu-list__parent-link';
    if (page.applicationFormStatus == ApplicationFormStatus.Complete) className += ' isComplete';
    if (openPages.includes(page.id)) className += ' toggled';
    return className;
  };

  const toggleLink = (e: MouseEvent<HTMLButtonElement>, id: number) => {
    if (openPages.includes(id)) {
      const newOpenPages: number[] = [];
      openPages.forEach((pageId) => {
        if (pageId !== id) newOpenPages.push(pageId);
      });
      setOpenPages(newOpenPages);
    } else {
      setOpenPages([...openPages, id]);
    }
  };

  const displayPages = workflowName == 'Illustration' ? pages?.slice(0, pages.length - 1) : pages;

  return (
    <section className="c-section-menu">
      <header className="c-section-menu__header">
        <Icon name="progress" />
        <h3>{workflowName}</h3>
        <button onClick={() => closeMenu(false)}>
          <span>Close Menu</span>
          <Icon name="close" />
        </button>
      </header>
      <div className="c-section-menu__body">
        <ol className="c-section-menu-list">
          {displayPages &&
            displayPages.map((page) =>
              page?.sections?.length > 0 ? (
                <li
                  key={`page ${page.id}`}
                  className={`c-section-men-list__section ${
                    page.applicationFormStatus == ApplicationFormStatus.Complete && 'isComplete'
                  }`}
                >
                  <button onClick={(e) => toggleLink(e, page.id)} className={setParentClasses(page)}>
                    <Icon name="arrowDown" />
                    <span className="c-section-menu__label">{page.name}</span>
                    {page.applicationFormStatus == ApplicationFormStatus.Complete && <Icon name="tick" />}
                  </button>

                  <ol>
                    {page &&
                      page.sections &&
                      page.sections.map((section) => (
                        <li key={`section ${section.id}`}>
                          <Link
                            to={{
                              pathname: `${rootPath}${page.id}/${section.id}`,
                              state: {
                                loanPurposeId: location?.state?.loanPurposeId,
                                case: location?.state?.case,
                                applicants: location?.state?.applicants,
                              },
                            }}
                            className={`c-section-menu-list__child-link ${
                              section.applicationFormStatus == ApplicationFormStatus.Complete ? 'isComplete' : ''
                            }`}
                          >
                            <span></span>
                            <span className="c-section-menu-list__label">{section.name}</span>
                            {section.applicationFormStatus == ApplicationFormStatus.Complete && <Icon name="tick" />}
                          </Link>
                        </li>
                      ))}
                  </ol>
                </li>
              ) : (
                <li
                  key={`page ${page.name}`}
                  className={`c-section-men-list__section ${
                    page.applicationFormStatus == ApplicationFormStatus.Complete && 'isComplete'
                  }`}
                >
                  <Link
                    to={{
                      pathname: `${rootPath}${page.name}`,
                      state: {
                        loanPurposeId: location?.state?.loanPurposeId,
                        case: location?.state?.case,
                        applicants: location?.state?.applicants,
                      },
                    }}
                    className={setParentClasses(page)}
                  >
                    <Icon name="arrowDown" />
                    <span className="c-section-menu__label">{page.name}</span>
                    {page.applicationFormStatus == ApplicationFormStatus.Complete && <Icon name="tick" />}
                  </Link>
                </li>
              ),
            )}
        </ol>
      </div>
    </section>
  );
};
