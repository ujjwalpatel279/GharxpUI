import React, { ChangeEvent, FunctionComponent, useEffect, useState, KeyboardEvent } from 'react';
import { Grid } from '../../shared';
import { GridColumn, GridRow } from 'components/shared/grid/grid';
import { ProductCategoryInterface, ProductInterface, RateTypeInterface } from 'shared/models';

import { Section, FilterSelect, InputSearch } from '../../shared';

import './product-table.scss';

interface ProductTableInterface {
  productList: ProductInterface[];
  productCategories: ProductCategoryInterface[];
  rateTypes: RateTypeInterface[];
  handleKey: (e: KeyboardEvent<HTMLInputElement>) => void;
  pageFunction?: (pageNumber: number, pageSize: number) => Promise<GridRow[]>;
  sortFunction?: (column: GridColumn, order: string) => Promise<GridRow[]>;
  rateTypeChangeHandler?: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  productListChangeHandler?: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  selectedProductCategory?: number;
  selectedRateType?: number;
}

export const ProductTable: FunctionComponent<ProductTableInterface> = ({
  productList,
  productCategories,
  rateTypes,
  handleKey,
  pageFunction,
  sortFunction,
  rateTypeChangeHandler,
  productListChangeHandler,
  selectedProductCategory,
  selectedRateType,
}) => {
  const [pageCount, setPageCount] = useState(1);

  const Columns: GridColumn[] = [
    {
      id: 'description',
      description: 'Product',
    },
    {
      id: 'productTypeId',
      description: 'Rate Type',
      sort: false,
      render(column: GridColumn, row: GridRow) {
        return <>{row[column.id] === 1 ? 'Fixed' : 'Variable'}</>;
      },
    },
    { id: 'loanPurpose', description: 'Loan Purpose' },
    { id: 'productCode', description: 'Product Code' },
    { id: 'initialRate', description: '% Initial Rate', sort: false },
    { id: 'standardVariableRate', description: '% Subsequent Rate' },
    { id: 'ltv', description: '% LTV' },
    { id: 'productFee', description: 'Product Fee' },
    { id: 'erc', description: 'ERC' },
  ];

  useEffect(() => {
    let count = 1;
    if (productList && productList.length > 0) count = productList[0]?.pageCount || 1;
    setPageCount(count);
  }, [productList]);

  return (
    <Section
      headerChildren={
        <div className="c-product">
          <div>
            <FilterSelect
              id="rate-type"
              required={false}
              forceSelection={true}
              placeHolder="Rate type"
              value={selectedRateType}
              options={rateTypes?.map((rateType) => ({
                id: rateType.id,
                value: rateType.name,
              }))}
              onChange={rateTypeChangeHandler}
            />
          </div>
          <div>
            <FilterSelect
              id="product-list"
              required={false}
              forceSelection={true}
              value={selectedProductCategory}
              placeHolder="Product Category"
              options={
                productCategories?.map((prod) => ({
                  id: prod.id,
                  value: prod.name,
                })) ?? []
              }
              onChange={productListChangeHandler}
            />
          </div>
          <div className="c-search-add">
            <InputSearch id="search-clients" onKeyUp={handleKey} />
          </div>
        </div>
      }
    >
      <Grid
        pageSize={10}
        rowData={productList}
        columns={Columns}
        maxPage={pageCount}
        gotoPage={pageFunction}
        sortRows={sortFunction}
        extendClass="c-product-table"
        noRowsMessage="No products are currently available"
        defaultSortColumn="description"
        defaultDirection="Asc"
      />
    </Section>
  );
};
