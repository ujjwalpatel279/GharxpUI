import React, { FunctionComponent, ReactElement, useState, useEffect, KeyboardEvent, ChangeEvent } from 'react';

import { services } from '../../../shared/api/services';

import { ProductCategoryInterface, ProductInterface, RateTypeInterface } from '../../../shared/models';
import { ProductTable } from '../../sections/products-table/products-table';
import { PageHeading } from '../../shared';

import { Container } from '../../shared';
import { GridColumn } from '../../shared/grid/grid';

export const ProductsPage: FunctionComponent = (): ReactElement => {
  const [productCategories, setProductCategories] = useState<ProductCategoryInterface[]>([]);
  const [productCategory, setProductCategory] = useState<number>(0);
  const [keyPressed, setKeyPressed] = useState<string | null>(' ');
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [rateTypes, setRateTypes] = useState<RateTypeInterface[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(' ');
  const [sortColumn, setSortColumn] = useState<string>('Description');
  const [sortOrder, setSortOrder] = useState<string>('Asc');
  const [rateType, setRateType] = useState<number>(0);
  const pageSize = 10;

  const handleKey: (event: KeyboardEvent<HTMLInputElement>) => void = (e) => {
    setKeyPressed(e.currentTarget.value);
  };

  const fetchProducts = async (searchTerm: string) => {
    setSearchTerm(searchTerm);
    const results = (await services.getProducts(productCategory, rateType, searchTerm ?? '', 1, pageSize)).data;
    setProducts(
      results?.map((product) => {
        product.ltv = `${product.minimumLoanToValue} - ${product.maximumLoanToValue}`;
        return product;
      }),
    );
  };

  const fetchPageData = async (pageNumber: number, pageSize: number) => {
    const results = await services.getProducts(
      productCategory,
      rateType,
      searchTerm ?? '',
      pageNumber,
      pageSize,
      sortColumn,
      sortOrder,
    );
    setProducts(
      results.data?.map((product) => {
        product.ltv = `${product.minimumLoanToValue} - ${product.maximumLoanToValue}`;
        return product;
      }),
    );
    return products;
  };

  const fetchSortedData = async (column: GridColumn, order: string) => {
    setSortOrder(order);
    setSortColumn(column.id);
    const results = await services.getProducts(
      productCategory,
      rateType,
      searchTerm ?? '',
      1,
      pageSize,
      column.id,
      order,
    );
    setProducts(
      results.data?.map((product) => {
        product.ltv = `${product.minimumLoanToValue} - ${product.maximumLoanToValue}`;
        return product;
      }),
    );
    return products;
  };

  const rateTypeChangeHandler = async (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setRateType(Number(e.currentTarget.value));
    const results = await services.getProducts(
      productCategory,
      Number(e.currentTarget.value),
      searchTerm ?? '',
      1,
      pageSize,
      sortColumn,
      sortOrder,
    );
    setProducts(
      results.data?.map((product) => {
        product.ltv = `${product.minimumLoanToValue} - ${product.maximumLoanToValue}`;
        return product;
      }),
    );
  };

  const productListChangeHandler = async (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProductCategory(Number(e.currentTarget.value));
  };

  useEffect(() => {
    const rateTypes: RateTypeInterface[] = [
      { id: 0, name: 'All' },
      { id: 1, name: 'Fixed' },
      { id: 2, name: 'Variable' },
    ];
    setRateTypes(rateTypes);

    const defaultProductCategory: ProductCategoryInterface = {
      id: 0,
      name: 'All',
    };
    services.getProductCategories().then((result) => {
      if (result && result?.data.length > 0) {
        setProductCategories([defaultProductCategory, ...result.data]);
      }
    });
  }, []);

  useEffect(() => {
    fetchProducts(keyPressed);
  }, [productCategory]);

  useEffect(() => {
    fetchProducts(keyPressed);
  }, [keyPressed]);

  return (
    <section>
      <PageHeading headingLevel={2} title="Products" icon="products" mb={6} />
      <Container fullWidth>
        <ProductTable
          productList={products}
          productCategories={productCategories}
          rateTypes={rateTypes}
          handleKey={handleKey}
          pageFunction={fetchPageData}
          sortFunction={fetchSortedData}
          rateTypeChangeHandler={rateTypeChangeHandler}
          productListChangeHandler={productListChangeHandler}
          selectedProductCategory={productCategory}
          selectedRateType={rateType}
        />
      </Container>
    </section>
  );
};
