import React, { FunctionComponent, ReactElement, useEffect, useState, MouseEvent, createRef, useRef } from 'react';
import './notes.scss';
import { NoteInterface } from '../../../shared/models';
import { Button, Icon } from '../../shared';
import { services } from '../../../shared';

interface NoteComponentInterface {
  notes: NoteInterface[];
  caseId: number;
  customerId: number;
  fetchData?: () => void;
}

export const Notes: FunctionComponent<NoteComponentInterface> = ({
  notes,
  caseId,
  customerId,
  fetchData,
}): ReactElement => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<NoteInterface[]>();
  const [societyName, setSocietyName] = useState<string>('');
  const [displaySeeMoreLabel, setDisplaySeeMoreLabel] = useState([]);
  const [displaySeeLessLabel, setDisplaySeeLessLabel] = useState([]);

  const saveNote: (e: React.MouseEvent<HTMLButtonElement>) => void = (e) => {
    const noteText = inputRef.current.value;
    if (noteText !== '') {
      services.saveNote(caseId, customerId, inputRef.current.value).then(() => {
        fetchData();
        inputRef.current.value = '';
      });
    }
  };

  const fetchSocietyName = async () => {
    const moduleText = (await services.getModuleText('[SOCIETY-NAME]__SYST_SOC_DTLS')).data;
    setSocietyName(moduleText.description);
  };

  const seeMore: (e: React.MouseEvent<HTMLButtonElement>) => void = (e) => {
    const note = notes.find((note) => note.id === Number(e.currentTarget.getAttribute('data-value')));
    const index = notes.indexOf(note);
    const seeMore = Object.assign([], displaySeeMoreLabel);
    const seeLess = Object.assign([], displaySeeLessLabel);
    seeLess[index] = true;
    seeMore[index] = false;
    setDisplaySeeMoreLabel(seeMore);
    setDisplaySeeLessLabel(seeLess);
  };

  const hasTextExceededMax = (note: NoteInterface) => {
    return note.text.length > 40 * 5 - 3;
  };

  const seeLess: (e: React.MouseEvent<HTMLButtonElement>) => void = (e) => {
    const note = notes.find((note) => note.id === Number(e.currentTarget.getAttribute('data-value')));
    const index = notes.indexOf(note);
    const seeMore = Object.assign([], displaySeeMoreLabel);
    const seeLess = Object.assign([], displaySeeLessLabel);
    seeLess[index] = false;
    seeMore[index] = true;
    setDisplaySeeMoreLabel(seeMore);
    setDisplaySeeLessLabel(seeLess);
  };

  useEffect(() => {
    setData(notes);
    fetchSocietyName();
    setDisplaySeeMoreLabel(notes.map((note) => hasTextExceededMax(note)));
    setDisplaySeeLessLabel(notes.map(() => false));
  }, [caseId, customerId, notes]);

  return (
    <div className="notes">
      <div className="notes__text_field">
        <input type="text" ref={inputRef} className="c-input" placeholder="Type note..." />
        <span className="notes__add_entry">
          <Button type="button" variant="primary" icon="submitarrow" iconPosition="left" onClick={saveNote}></Button>
        </span>
      </div>
      <div className="notes__list">
        {data?.length > 0 &&
          (data ?? []).map((note, i) => (
            <div key={i}>
              <div className={note.advisorId ?? 0 > 0 ? 'notes__sent' : 'notes__recd'}>
                <p className={((note.advisorId ?? 0) === 0 ? 'notes__recd-text' : 'notes__recd-hidden') + ' u-fs-2'}>
                  <b>{societyName}</b>
                </p>
                <div className="box">
                  <div className="u-fs-2">
                    {note.text.substr(0, 40 * 5 - 3)}
                    {displaySeeMoreLabel[i] ? '...' : ''}
                    {displaySeeLessLabel[i] ? note.text.substr(40 * 5 - 3) : ''}
                  </div>
                  <button
                    onClick={seeMore}
                    data-value={note.id}
                    className={
                      hasTextExceededMax(note) && displaySeeMoreLabel[i] ? 'notes__text u-fs-2' : 'hidden-label'
                    }
                  >
                    <b>See more</b>
                  </button>
                  <button
                    onClick={seeLess}
                    data-value={note.id}
                    className={
                      hasTextExceededMax(note) && displaySeeLessLabel[i] ? 'notes__text u-fs-2' : 'hidden-label'
                    }
                  >
                    <b>See less</b>
                  </button>
                  <span className="u-flex__align-right">
                    <small>{note.formattedCreated}</small>
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
