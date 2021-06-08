import React, { FunctionComponent, MouseEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Button, Icon } from '..';

import './grid.scss';

interface GridProps {
  extendClass?: string;
  rowData?: GridRow[];
  noRowsMessage?: React.ReactNode;
  columns?: GridColumn[];
  pageSize?: number;
  maxPage?: number;
  pinned?: 'left' | 'right';
  selectFunction?: (e: MouseEvent<HTMLButtonElement>) => void;
  selectRow?: (row: GridRow) => void;
  gotoPage?: (pageNumber: number, pageSize: number) => Promise<GridRow[]>;
  sortRows?: (column: GridColumn, order: string) => Promise<GridRow[]>;
  disablePaging?: boolean;
  showHeaders?: boolean;
  defaultSortColumn?: string;
  defaultDirection?: 'Asc' | 'Desc';
}
export type GridRow = any;

export interface GridColumn {
  id: string;
  description?: string;
  minWidth?: number;
  width?: number;
  filter?: boolean;
  sort?: boolean;
  resize?: boolean;
  hidden?: boolean;
  span?: number;
  extendClass?: string;
  render?: (column: GridColumn, row: GridRow) => JSX.Element;
  renderHead?: (column: GridColumn) => JSX.Element;
}

const sort = {
  asc: 'Asc',
  desc: 'Desc',
};

type SortColumn = {
  id: string;
  direction: string;
};

export const Grid: FunctionComponent<GridProps> = ({
  rowData,
  columns,
  selectFunction,
  selectRow,
  gotoPage,
  pageSize,
  maxPage,
  sortRows,
  pinned,
  noRowsMessage,
  extendClass,
  disablePaging,
  showHeaders,
  defaultSortColumn,
  defaultDirection,
}) => {
  const [displayData, setDisplayData] = useState<any[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [activeRow, setActiveRow] = useState<number>(0);
  const [pageLimit, setPageLimit] = useState<number>(1);
  const [sortColumn, setSortColumn] = useState<SortColumn>({ id: undefined, direction: ' ' });

  let gridClasses = 'c-grid';

  if (pinned) {
    gridClasses += ` sticky-${pinned}`;
  }
  if (extendClass) {
    gridClasses += ` ${extendClass}`;
  }

  const paging = (increment: number) => {
    let pNum = pageNumber + increment;
    pNum = pNum < 1 ? 1 : pNum > pageLimit ? pageNumber : pNum;
    fetchData(rowData, pNum);
  };

  const fetchData = (data: GridRow[], pagePosition?: number) => {
    const nextPage = pagePosition || pageNumber;
    if (pageSize == undefined && gotoPage == undefined) setDisplayData(data);
    else if (gotoPage !== undefined) {
      gotoPage(nextPage, pageSize).then((result) => {
        setDisplayData(result);
      });
    } else {
      pageData(data, nextPage);
    }
    setPageNumber(nextPage);
  };

  const pageData = (data: GridRow[], pageNumber: number) => {
    if (pageSize == undefined) {
      setDisplayData(data);
    } else {
      const pagePosition = pageNumber * pageSize;
      setDisplayData(data?.slice(pagePosition - pageSize, pagePosition) ?? []);
    }
  };

  const sorting = (e: MouseEvent, column: GridColumn) => {
    const targetColumn: SortColumn = {
      id: column.id,
      direction: sortColumn.id === column.id ? sortColumn.direction : sort.desc,
    };
    if (sortColumn.direction == sort.desc) {
      targetColumn.id = undefined;
      targetColumn.direction = undefined;
    } else {
      targetColumn.direction = targetColumn.direction === sort.asc ? sort.desc : sort.asc;
    }
    setSortColumn(targetColumn);

    if (sortRows !== undefined) {
      const sortedColumn =
        targetColumn.id == undefined ? columns?.find((col) => col.id == defaultSortColumn) ?? column : column;
      sortRows(sortedColumn, targetColumn.direction ?? defaultDirection).then((result) => {
        setPageNumber(1);
        pageData(result, 1);
      });
    } else {
      fetchData(rowData);
    }
  };

  useEffect(() => {
    pageData(rowData, 1);
    setPageLimit(maxPage || Math.round(rowData?.length || 1 / pageSize));
  }, [rowData]);

  useEffect(() => {
    setPageLimit(maxPage);
  }, [maxPage]);

  useEffect(() => {
    if (selectFunction !== undefined)
      columns.push({
        id: 'Select',
        description: 'Select',
        sort: false,
        filter: false,
        render: (column: GridColumn, row: any) => {
          return (
            <Button type="button" variant="primary" onClick={selectFunction} dataValue={row.id}>
              {'Select'}
            </Button>
          );
        },
      });
  }, [columns]);

  const firstPage = () => {
    fetchData(rowData, 1);
  };

  const nextPage = () => {
    paging(1);
  };

  const prevPage = () => {
    paging(-1);
  };

  const lastPage = () => {
    fetchData(rowData, pageLimit);
  };
  const selectRowEvent = (e: MouseEvent<HTMLElement>, row: GridRow, rowIndex: number) => {
    if (selectRow) {
      setActiveRow(rowIndex);
      selectRow(row);
    }
  };

  return (
    <div className="c-overflow">
      <table className={gridClasses}>
        <thead>
          <tr>
            {columns
              .filter((col) => !(col.hidden ?? false))
              .map((column: GridColumn) =>
                column.renderHead !== undefined ? (
                  column.renderHead(column)
                ) : (
                  <th colSpan={column.span || 1} key={`header-${column.id}`} hidden={!(showHeaders ?? true)}>
                    {column.sort == false ? (
                      column.description
                    ) : (
                      <button onClick={(e) => sorting(e, column)}>
                        {column.description}
                        {sortColumn.id === column.id ? (
                          sortColumn.direction === sort.asc ? (
                            <Icon name="chevronDown" />
                          ) : sortColumn.direction === sort.desc ? (
                            <Icon name="chevronUp" />
                          ) : null
                        ) : null}
                      </button>
                    )}
                  </th>
                ),
              )}
          </tr>
        </thead>
        <tbody>
          {rowData && rowData.length > 0 ? (
            displayData.map((row, rowIndex) => (
              <tr
                key={`row-${rowIndex}`}
                onClick={selectRow ? (e) => selectRowEvent(e, row, rowIndex) : undefined}
                className={selectRow ? (rowIndex == activeRow ? 'active' : undefined) : undefined}
              >
                {columns
                  .filter((col) => !(col.hidden ?? false))
                  .map((column) => (
                    <td
                      key={`row-${rowIndex}-${column.id}`}
                      colSpan={column.span || 1}
                      className={column.extendClass ?? ''}
                    >
                      {column.render !== undefined ? column.render(column, row) : row[column.id]}
                    </td>
                  ))}
              </tr>
            ))
          ) : (
            <tr className="c-grid__no-data">
              <td colSpan={columns.length}>{noRowsMessage || 'No rows available'}</td>
            </tr>
          )}
        </tbody>
        {disablePaging !== true && rowData && rowData.length > 0 && (gotoPage || pageSize) && (
          <tfoot>
            <tr>
              <td colSpan={columns.length}>
                <ul className="c-grid__pagination">
                  <li>
                    <button onClick={firstPage} title="Go to first page">
                      <span>Go to first page</span>
                      <Icon name="doubleChevronLeft" />
                    </button>
                  </li>
                  <li>
                    <button onClick={prevPage} title="Go to previous page">
                      <span>Go to previous page</span>
                      <Icon name="chevronLeft" />
                    </button>
                  </li>
                  <li className="c-grid__pagination-count">
                    <p>
                      <span>{pageNumber}</span>
                      <span className="u-fs-1">of</span>
                      <span>{pageLimit}</span>
                    </p>
                  </li>
                  <li>
                    <button onClick={nextPage} title="Go to next page">
                      <span>Go to next page</span>
                      <Icon name="chevronRight" />
                    </button>
                  </li>
                  <li>
                    <button onClick={lastPage} title="Go to last page">
                      <span>Go to last page</span>
                      <Icon name="doubleChevronRight" />
                    </button>
                  </li>
                </ul>
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
};
